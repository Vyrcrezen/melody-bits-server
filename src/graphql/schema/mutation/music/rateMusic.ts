import { GraphQLFieldConfig, GraphQLFloat, GraphQLID } from "graphql";
import { GraphqlReturnTemplate } from "../../types/GraphqlReturnTemplate";
import { rateMusic as rateMusicResolver } from '../../../resolver/mutation/music/rateMusic';

export const rateMusic: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlReturnTemplate('rateMusicReturn'),
    args: {
        musicId: { type: GraphQLID },
        ratingScore: { type: GraphQLFloat }
    },
    resolve: rateMusicResolver,
};