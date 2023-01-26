import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { updateFavoriteMusic } from './schema/mutation/userAccount/updateFavoriteMusic';

import { authUser } from './schema/query/authUser';
import { getMusicData } from './schema/query/getMusicData';
import { getRestrictedUserData } from './schema/query/getRestrictedUserData';
import { getUserData } from './schema/query/getUserData';
import { registerUser } from './schema/mutation/userAccount/registerUser';
import { removeFavoriteMusic } from './schema/mutation/userAccount/removeFavoriteMusic';
import { getGlobalTagList } from './schema/query/getGlobalTagList';
import { getGlobalArtistList } from './schema/query/getGlobalArtistList';
import { getGlobalRecordLabelList } from './schema/query/getGlobalRecordLabelList';
import { getGlobalPublisherList } from './schema/query/getGlobalPublisherList';
import { editUserData } from './schema/mutation/userAccount/editUserData';
import { deleteUser } from './schema/mutation/userAccount/deleteUser';
import { addMusicComment } from './schema/mutation/music/addMusicComment';
import { editMusicComment } from './schema/mutation/music/editMusicComment';
import { removeMusicComment } from './schema/mutation/music/removeMusicComment';
import { addTagToGlobalList } from './schema/mutation/global/addTagToGlobalList';
import { addArtistToGlobalList } from './schema/mutation/global/addArtistToGlobalList';
import { addRecordLabelToGlobalList } from './schema/mutation/global/addRecordLabelToGlobalList';
import { addPublisherToGlobalList } from './schema/mutation/global/addPublisherToGlobalList';
import { removeTagFromGlobalList } from './schema/mutation/global/removeTagFromGlobalList';
import { removeArtistFromGlobalList } from './schema/mutation/global/removeArtistFromGlobalList';
import { removeRecordLabelFromGlobalList } from './schema/mutation/global/removeRecordLabelFromGlobalList';
import { removePublisherFromGlobalList } from './schema/mutation/global/removePublisherFromGlobalList';
import { editMusicData } from './schema/mutation/music/editMusicData';
import { deleteMusic } from './schema/mutation/music/deleteMusic';
import { getPlaylist } from './schema/query/getPlaylist';
import { createPlaylist } from './schema/mutation/playlist/createPlaylist';
import { addMusicToPlaylist } from './schema/mutation/playlist/addMusicToPlaylist';
import { removeMusicFromPlaylist } from './schema/mutation/playlist/removeMusicFromPlaylist';
import { deletePlaylist } from './schema/mutation/playlist/deletePlaylist';
import { rearrangePlaylist } from './schema/mutation/playlist/rearrangePlaylist';
import { rateMusic } from './schema/mutation/music/rateMusic';
import { removeMusicRating } from './schema/mutation/music/removeMusicRating';
import { editPlaylist } from './schema/mutation/playlist/editPlaylist';
import { editMusicApproval } from './schema/mutation/music/editMusicApproval';
import { editUserClearance } from './schema/mutation/userAccount/editUserClearance';
import { banUser } from './schema/mutation/userAccount/banUser';
import { unbanUser } from './schema/mutation/userAccount/unbanUser';
import { updateMusicRating } from './schema/mutation/userAccount/updateMusicRating';
import { increaseMusicPlayed } from './schema/mutation/music/increaseMusicPlayed';

export const schema = new GraphQLSchema({

    query: new GraphQLObjectType({
        name: 'query',
        fields: {
            authUser: authUser,
            getUserData: getUserData, // getUserComments, getUserFavorites

            getRestrictedUserData: getRestrictedUserData,

            getGlobalTagList: getGlobalTagList,
            getGlobalArtistList: getGlobalArtistList,
            getGlobalRecordLabelList: getGlobalRecordLabelList,
            getGlobalPublisherList: getGlobalPublisherList,

            getMusicData: getMusicData, //getMusicComments
            getPlaylist: getPlaylist
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'mutation',
        fields: {
            registerUser: registerUser,
            editUserData: editUserData,
            editUserClearance: editUserClearance,
            deleteUser: deleteUser,
            banUser: banUser,
            unbanUser: unbanUser,

            updateFavoriteMusic: updateFavoriteMusic,
            removeFavoriteMusic: removeFavoriteMusic,
            updateMusicRating: updateMusicRating,

            addMusicComment: addMusicComment,
            editMusicComment: editMusicComment,
            removeMusicComment: removeMusicComment,

            rateMusic: rateMusic,
            removeMusicRating: removeMusicRating,

            addTagToGlobalList: addTagToGlobalList,
            addArtistToGlobalList: addArtistToGlobalList,
            addRecordLabelToGlobalList: addRecordLabelToGlobalList,
            addPublisherToGlobalList: addPublisherToGlobalList,

            removeTagFromGlobalList: removeTagFromGlobalList,
            removeArtistFromGlobalList: removeArtistFromGlobalList,
            removeRecordLabelFromGlobalList: removeRecordLabelFromGlobalList,
            removePublisherFromGlobalList: removePublisherFromGlobalList,

            editMusicData: editMusicData,
            editMusicApproval: editMusicApproval,
            deleteMusic: deleteMusic,
            increaseMusicPlayed: increaseMusicPlayed,

            createPlaylist: createPlaylist,
            editPlaylist: editPlaylist,
            deletePlaylist: deletePlaylist,
            addMusicToPlaylist: addMusicToPlaylist,
            removeMusicFromPlaylist: removeMusicFromPlaylist,
            rearrangePlaylist: rearrangePlaylist
        }
    })
});
