import { GraphQLFieldConfig, GraphQLID } from "graphql";
import { GraphqlGenericReturn } from "../../types/GraphqlReturnTemplate";
import { increaseMusicPlayed as increaseMusicPlayedResolver } from '../../../resolver/mutation/music/increaseMusicPlayed';

export const increaseMusicPlayed: GraphQLFieldConfig<any, any, { [argName: string]: any }> = {
    type: GraphqlGenericReturn,
    args: {
        musicId: { type: GraphQLID }
    },
    resolve: increaseMusicPlayedResolver,
};