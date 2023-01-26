import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList} from 'graphql';

export const validationErrorGt = new GraphQLObjectType({
    name: 'validationError',
    fields: {
        target: { type: GraphQLString },
        path: { type: GraphQLString },
        value: { type: GraphQLString },
        message: { type: GraphQLString },
        messageCode: {type: GraphQLString}
    }
});

export const MutationResponseGt = new GraphQLObjectType({
    name: 'MutationResponse',
    fields: {
        code: {type: GraphQLFloat},
        validationError: { type: GraphQLList(validationErrorGt)},
        message: {type: GraphQLString},
        messageCode: {type: GraphQLString}
    }
});
