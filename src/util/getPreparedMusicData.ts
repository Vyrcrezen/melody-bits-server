import { Music } from "../models/sql/music.sql";

export function getPreparedMusicData(musicData: Music[], requesterId?: number) {
    return musicData.map(async (item) => {
        return {
            id: item.id,
            uploaded_at: item.created_at,
            uploader: {
                user_id: item.uploader?.id,
                user_name: item.uploader?.user_name,
                registration_time: item.uploader?.created_at,
                last_online: item.uploader?.last_online,
            },
            created_at: item.created_at,
            edited_at: item.updated_at,
            editor: {
                user_name: item.editor?.user_name,
                registration_time: item.editor?.created_at,
                last_online: item.editor?.last_online,
            },
            title: item.title,
            tags: item.tags,
            artist: {
                id: item.artist_id,
                name: item.artist?.name,
            },
            record_label: {
                id: item.record_label_id,
                name: item.record_label?.name,
            },
            publisher: {
                id: item.publisher_id,
                name: item.publisher?.name,
            },
            album: item.album,
            link: item.link,
            num_played: item.num_played,
            avg_rating: item.avg_rating,
            ratings_num: item.ratings_num,

            user_rating: (item.ratings && requesterId) ? (item.ratings.find(item => item.user_id === requesterId)?.rating ?? 0) : 0,

            aws_root: item.aws_root,
            music_size: item.music_size,
            comments: item.comment?.map((commentItem) => {
                return {
                    user_name: commentItem.user?.user_name,
                    user_id: commentItem.user_id,
                    commentText: commentItem.comment_text,
                    created_at: commentItem.created_at,
                    updated_at: commentItem.updated_at,
                    deleted_at: null,
                };
            }),
            is_favorite: requesterId ? !!item.favored_by?.find(user => user.id === requesterId) : false
        };
    });
}