import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";
import { removeMusicRating as removeMusicRatingResolver } from '../../../resolver/mutation/music/removeMusicRating';

export const removeMusicRating: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('removeMusicRatingReturn'),
    args: {
        musicId: { type: GraphQLID }
    },
    resolve: removeMusicRatingResolver,
};