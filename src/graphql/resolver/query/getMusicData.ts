import {
    IsArray,
    IsBoolean,
    IsDate,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    validate,
    ValidateNested,
} from "class-validator";
import { Request } from "express";
import { Includeable, Op, WhereOptions } from "sequelize";
import { Artist } from "../../../models/sql/artist.sql";
import { Music } from "../../../models/sql/music.sql";
import { Publisher } from "../../../models/sql/publisher.sql";
import { RecordLabel } from "../../../models/sql/record_label.sql";
import { Tag } from "../../../models/sql/tag.sql";
import { UserCommentMusic } from "../../../models/sql/user_comment_music.sql";
import { UserAccount } from "../../../models/sql/user_account.sql";
import { Merge } from "../../../types/merge";
import { getValidationFromError } from "../../../util/getValidationFromError";
import { UserMusicRating } from "../../../models/sql/user_music_rating.sql";
import { getPreparedMusicData } from "../../../util/getPreparedMusicData";
import { MusicApproval } from "../../../models/sql/music_approval";

type ColumnOrderNameType = 'title' | 'avg_rating' | 'created_at' | 'num_played' | 'uploader_name';
type ColumnOrderDirectionType = 'ASC' | 'DESC';

class Tags {
    @IsArray()
    @IsString({ each: true })
    @Length(2, 20, { each: true, message: "Tag name length must be between 2 and 20 characters!" })
    values?: string[];
    Options?: { relAnd: boolean };

    constructor(tag: Tags) {
        this.values = tag?.values;
        this.Options = tag?.Options;
    }
}

class getMusicDataArgType {
    @Length(2, 128)
    @IsString()
    @IsOptional()
    musicTitle?: string;

    @Length(2, 128)
    @IsString()
    @IsOptional()
    artistName?: string;

    @Length(2, 128)
    @IsString()
    @IsOptional()
    recordLabelName?: string;

    @Length(2, 128)
    @IsString()
    @IsOptional()
    publisherName?: string;

    @Length(3, 20)
    @IsString()
    @IsOptional()
    uploaderName?: string;

    @ValidateNested()
    tags?: Tags;

    @IsDate()
    @IsOptional()
    uploadDateMin?: string;
    @IsDate()
    @IsOptional()
    uploadDateMax?: string;

    @IsNumber()
    @IsOptional()
    playedMin?: number;
    @IsNumber()
    @IsOptional()
    playedMax?: number;

    @IsNumber()
    @IsOptional()
    ratingMin?: number;
    @IsNumber()
    @IsOptional()
    ratingMax?: number;

    @IsBoolean()
    @IsOptional()
    isFavorite?: boolean;

    @IsBoolean()
    @IsOptional()
    isPendingApproval?: boolean;

    @IsOptional()
    approvalStatusList?: number[];

    @IsIn([ 'title', 'avg_rating', 'created_at', 'num_played', 'uploader_name' ])
    @IsOptional()
    orderByColumn?: ColumnOrderNameType;

    @IsIn([ 'ASC', 'DESC' ])
    @IsOptional()
    orderByDirection?: ColumnOrderDirectionType;

    @IsNumber()
    @IsOptional()
    pageNum?: number;

    constructor(filters: getMusicDataArgType) {
        this.musicTitle = filters.musicTitle;
        this.artistName = filters.artistName;
        this.recordLabelName = filters.recordLabelName;
        this.publisherName = filters.publisherName;
        this.uploaderName = filters.uploaderName;
        this.tags = filters.tags ? new Tags(filters.tags) : undefined;
        this.uploadDateMin = filters.uploadDateMin;
        this.uploadDateMax = filters.uploadDateMax;
        this.playedMin = filters.playedMin;
        this.playedMax = filters.playedMax;
        this.ratingMin = filters.ratingMin;
        this.ratingMax = filters.ratingMax;
        this.isFavorite = filters.isFavorite;
        this.isPendingApproval = filters.isPendingApproval;
        this.approvalStatusList = filters.approvalStatusList;
        this.orderByColumn = filters.orderByColumn;
        this.orderByDirection = filters.orderByDirection;
        this.pageNum = filters.pageNum;
    }
}

export const getMusicData = async (
    _obj: any,
    filters: Merge<{ [argName: string]: any }, getMusicDataArgType>,
    context: Merge<{ [prop: string]: any }, Partial<Request>>
) => {
    try {
        let userClearance: undefined | number = undefined;

        if (filters.isPendingApproval) {
            if (context.jwtAuth?.user_id) {

                const user = await UserAccount.findByPk(context.jwtAuth?.user_id);

                userClearance = user?.clearance;

                if (user) {
                    user.update(
                        { last_online: new Date() },
                        { where: { id: context.jwtAuth?.user_id } }
                    );
                }
            }
        }

        if ((filters.isPendingApproval && !userClearance) ||
            (filters.isPendingApproval && userClearance && ( userClearance < 1 || 2 < userClearance ))) {
                console.log('Unauthorized')
                console.log(userClearance)
            return {
                code: 401,
                message: 'Unauthorized!',
                data: []
            }
        }

        const validationResult = await validate(new getMusicDataArgType(filters));

        if (validationResult.length > 0) {
            return {
                code: 400,
                message: "Invalid filter argument",
                validationError: getValidationFromError(validationResult),
                data: []
            };
        }
        console.log('filters.approvalStatusList');
        console.log(filters.approvalStatusList);
        const approvalStatusList = filters.approvalStatusList ? filters.approvalStatusList.length === 0 ? [0, 1, 2, 3] : filters.approvalStatusList : undefined;
        // const approvalStatusList = filters.approvalStatusList ? filters.approvalStatusList.filter(item => ![0, 1, 2, 3].includes(item) ) : [];

        // console.log('filters.isPendingApproval');
        // console.log(filters.isPendingApproval);

        const musicWhereOptions: WhereOptions<any> = {
            [Op.and]: {
                approver_id: {
                    [filters.isPendingApproval ? Op.is : Op.not]: null,
                },
                [Op.or]:
                    filters.musicTitle ||
                    filters.uploadDateMin ||
                    filters.uploadDateMax ||
                    filters.playedMin ||
                    filters.playedMax
                        ? Object.assign(
                              {},
                              filters.musicTitle
                                  ? { title: { [Op.substring]: filters.musicTitle } }
                                  : {},
                              filters.uploadDateMin || filters.uploadDateMax
                                  ? {
                                        created_at: {
                                            [Op.between]: [
                                                new Date(
                                                    filters.uploadDateMin &&
                                                    !Number.isNaN(filters.uploadDateMin)
                                                        ? +filters.uploadDateMin
                                                        : 0
                                                ),
                                                new Date(
                                                    filters.uploadDateMax &&
                                                    !Number.isNaN(filters.uploadDateMax)
                                                        ? +filters.uploadDateMax
                                                        : 99999999999999
                                                ),
                                            ],
                                        },
                                    }
                                  : {},
                              filters.playedMin || filters.playedMax
                                  ? {
                                        num_played: {
                                            [Op.between]: [
                                                filters.playedMin &&
                                                !Number.isNaN(filters.playedMin)
                                                    ? +filters.playedMin
                                                    : 0,
                                                filters.playedMax &&
                                                !Number.isNaN(filters.playedMax)
                                                    ? +filters.playedMax
                                                    : 999999999999999,
                                            ],
                                        },
                                    }
                                  : {},
                              filters.ratingMin || filters.ratingMax
                                  ? {
                                        avg_rating: {
                                            [Op.between]: [
                                                filters.ratingMin &&
                                                !Number.isNaN(filters.ratingMin)
                                                    ? +filters.ratingMin
                                                    : -100,
                                                filters.ratingMax &&
                                                !Number.isNaN(filters.ratingMax)
                                                    ? +filters.ratingMax
                                                    : 100,
                                            ],
                                        },
                                    }
                                  : {}
                          )
                        : {
                              title: {
                                  [Op.not]: null,
                              },
                          },
            },
        };

        const musicIncludeable: Includeable[] = [
            {
                model: UserAccount,
                as: "uploader",

                where: filters.uploaderName
                    ? {
                          user_name: {
                              [Op.substring]: filters.uploaderName,
                          },
                      }
                    : undefined,
            },
            {
                model: UserAccount,
                as: "editor",
            },
            {
                model: Tag,
                as: "tags",

                where: filters.tags?.values
                    ? {
                          name: {
                              [filters.tags.Options?.relAnd ? Op.in : Op.in]:
                                  filters.tags?.values,
                          },
                      }
                    : undefined,
                through: {},
            },
            {
                model: Artist,
                as: "artist",
                where: filters.artistName
                    ? {
                          name: {
                              [Op.substring]: filters.artistName,
                          },
                      }
                    : undefined,
            },
            {
                model: RecordLabel,
                as: "record_label",
                where: filters.recordLabelName
                    ? {
                          name: {
                              [Op.substring]: filters.recordLabelName,
                          },
                      }
                    : undefined,
            },
            {
                model: Publisher,
                as: "publisher",
                where: filters.publisherName
                    ? {
                          name: {
                              [Op.substring]: filters.publisherName,
                          },
                      }
                    : undefined,
            },
            {
                model: UserCommentMusic,
                as: "comment",
                limit: 8,
                paranoid: false,
                include: [
                    {
                        model: UserAccount,
                        as: "user",
                    },
                ],
            },
            {
                model: UserAccount,
                as: "favored_by",
                where:
                    filters.isFavorite && context?.jwtAuth?.user_id
                        ? {
                              user_id: context?.jwtAuth?.user_id,
                          }
                        : undefined,
            },
            {
                model: UserMusicRating,
                as: "ratings",
            },
            {
                model: MusicApproval,
                as: "approvals",
                where: approvalStatusList
                    ? {
                          status: {
                              [Op.in]: approvalStatusList,
                          },
                      }
                    : undefined,
            },
        ];

        const matchedMusicCount = await Music.count({
            where: musicWhereOptions,
            include: musicIncludeable,
            distinct: true
        });

        console.log(matchedMusicCount);

        const musicLimit = 2;
        const musicOffset = filters.pageNum ?? 0 * musicLimit;

        const musicData = await Music.findAll({
            limit: musicLimit,
            offset: musicOffset,
            order: filters.orderByColumn && filters.orderByDirection ? [
                [filters.orderByColumn, filters.orderByDirection]
            ] : undefined,
            where: musicWhereOptions,
            include: musicIncludeable,
        });

        const preparedData = getPreparedMusicData(musicData, context.jwtAuth?.user_id);

        console.log(`musicOffset: ${musicOffset}`);

        return {
            code: 200,
            message: "Query Successful!",
            data: {
                paginationData: {
                    totalCount: matchedMusicCount,
                    offset: musicOffset,
                    limit: musicLimit,
                },
                musicData: preparedData
            },
        };
    } catch (err) {
        return {
            code: 500,
            message: "Query failed",
        };
    }
};

// interface getMusicDataArgType {
//     musicTitle?: string;
//     artistName?: string;
//     recordLabelName?: string;
//     publisherName?: string;
//     uploaderName?: string;

//     tags?: {
//         values?: string[],
//         Options?: { relAnd: boolean }
//     };

//     uploadDateMin?: string,
//     uploadDateMax?: string,

//     playedMin?: number,
//     playedMax?: number,

//     ratingMin?: number,
//     ratingMax?: number,
// }

// export const getMusicData = async (_obj: any, filters: Merge<{[argName: string]: any}, getMusicDataArgType>, _context: Merge<{ [prop: string]: any }, Partial<Request>>) => {

//     let filterIds: {
//         artistId?: number | undefined;
//         recordLabelId?: number | undefined;
//         publisherId?: number | undefined;
//         uploaderId?: number | undefined;
//     } = {}

//     if (filters.artistName) {
//         filterIds.artistId = (await Artist.findOne({where: { name: filters.artistName }}))?.id;
//     }
//     if (filters.recordLabelName) {
//         filterIds.recordLabelId = (await RecordLabel.findOne({where: { name: filters.recordLabelName }}))?.id;
//     }
//     if (filters.publisherName) {
//         filterIds.publisherId = (await Publisher.findOne({where: { name: filters.publisherName }}))?.id;
//     }
//     if (filters.uploaderName) {
//         filterIds.uploaderId = (await UserAccount.findOne({where: { user_name: filters.uploaderName }}))?.id;
//     }

//     const baseMusicData = await Music.findAll({
//         limit: 8,
//         where: {
//             [Op.or]: Object.assign(
//                 {},
//                 filters.musicTitle ? { title: { [Op.substring]: filters.musicTitle } } : {},
//                 filterIds.artistId ? { artist_id: filterIds.artistId } : {},
//                 filterIds.recordLabelId ? { record_label_id: filterIds.recordLabelId } : {},
//                 filterIds.publisherId ? { publisher_id: filterIds.publisherId } : {},
//                 filterIds.uploaderId ? { uploader_id: filterIds.uploaderId } : {}
//             ),
//         },
//         include: [
//             {
//                 model: Tag,
//                 as: "tags",
//                 where: {
//                     name: {
//                         [Op.in]: filters.tags?.values
//                     }
//                 },
//                 through: {
//                 }
//             },
//         ],
//     });

//     console.log(baseMusicData);

//     const musicDataPromise = baseMusicData.map( async (item) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const comment = await (await Music.findByPk(item.id))?.$get('comment', {paranoid: false}) as (UserCommentMusic[] | null | undefined);
//                 const tags = await item.get('tags');

//                 resolve ({
//                     ...item.get(),
//                     tags: tags,
//                     comment: comment
//                 });
//             }
//             catch (err) {
//                 reject(err);
//             }
//         })
//     });
//     const musicData = await Promise.all(musicDataPromise) as Music[];

//     const {userIds, artistIds, rLabelIds, publisherIds} = musicData.reduce((accIds, item) => {

//         if (item.uploader_id && !accIds.userIds.includes(item.uploader_id)) {
//             accIds.userIds.push(item.uploader_id);
//         }
//         if (item.editor_id && !accIds.userIds.includes(item.editor_id)) {
//             accIds.userIds.push(item.editor_id);
//         }
//         item.comment?.forEach(commentItem => {
//             if (commentItem.user_id && !accIds.userIds.includes(commentItem.user_id)) {
//                 accIds.userIds.push(commentItem.user_id);
//             }
//         })

//         if(item.artist_id && !accIds.artistIds.includes(item.artist_id)) {
//             accIds.artistIds.push(item.artist_id);
//         }

//         if(item.record_label_id && !accIds.rLabelIds.includes(item.record_label_id)) {
//             accIds.rLabelIds.push(item.record_label_id);
//         }

//         if(item.publisher_id && !accIds.publisherIds.includes(item.publisher_id)) {
//             accIds.publisherIds.push(item.publisher_id);
//         }

//         return accIds;

//     }, {userIds: new Array<number>, artistIds: new Array<number>, rLabelIds: new Array<number>, publisherIds: new Array<number>});

//     const userAccounts = await UserAccount.findAll({ where: { id: userIds } });
//     const artists = await Artist.findAll({ where: { id: artistIds } });
//     const rLabels = await RecordLabel.findAll({ where: { id: rLabelIds } });
//     const publishers = await Publisher.findAll({ where: { id: publisherIds } });

//     const preparedData = musicData.map( async (item) => {

//         const comments = (item.comment ? item.comment : []).map( (commentItem => {
//             return {
//                 user_name: userAccounts.find(userAcc => userAcc.id === commentItem.user_id)?.user_name,
//                 user_id: commentItem.user_id,
//                 registration_time: userAccounts.find(userAcc => userAcc.id === commentItem.user_id)?.created_at,
//                 last_online: userAccounts.find(userAcc => userAcc.id === commentItem.user_id)?.last_online,
//                 commentText: commentItem.deleted_at ? '' : commentItem.comment_text,
//                 created_at: commentItem.created_at,
//                 updated_at: commentItem.updated_at,
//                 deleted_at: commentItem.deleted_at,
//             }
//         }) );

//         return {
//             id: item.id,
//             uploaded_at: item.created_at,
//             uploader: {
//                 user_name: userAccounts.find(userAcc => userAcc.id === item.uploader_id)?.user_name,
//                 registration_time: userAccounts.find(userAcc => userAcc.id === item.uploader_id)?.created_at,
//                 last_online: userAccounts.find(userAcc => userAcc.id === item.uploader_id)?.last_online,
//             },
//             created_at: item.created_at,
//             edited_at: item.updated_at,
//             editor: {
//                 user_name: userAccounts.find(userAcc => userAcc.id === item.editor_id)?.user_name,
//                 registration_time: userAccounts.find(userAcc => userAcc.id === item.editor_id)?.created_at,
//                 last_online: userAccounts.find(userAcc => userAcc.id === item.editor_id)?.last_online,
//             },
//             title: item.title,
//             tags: item.tags,
//             artist: {
//                 id: item.artist_id,
//                 name: artists.find(artistAcc => artistAcc.id === item.artist_id)?.name,
//             },
//             record_label: {
//                 id: item.record_label_id,
//                 name: rLabels.find(rLabelAcc => rLabelAcc.id === item.record_label_id)?.name,
//             },
//             publisher: {
//                 id: item.publisher_id,
//                 name: publishers.find(publisherAcc => publisherAcc.id === item.publisher_id)?.name,
//             },
//             album: item.album,
//             link: item.link,
//             num_played: item.num_played,
//             avg_rating: item.avg_rating,

//             aws_root: item.aws_root,
//             music_size: item.music_size,
//             comments: comments
//         }
//     });

//     return preparedData;

// }
