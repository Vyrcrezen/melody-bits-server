import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLOutputType, GraphQLString } from "graphql";
// import { MusicDataGt } from "./musicData";
import { validationErrorGt } from "./mutationResponse";

export function GraphqlReturnTemplate<T extends GraphQLOutputType>(typeName: string, dataType?: T) {
    return new GraphQLObjectType({
        name: typeName,
        fields: {
            code: { type: GraphQLInt },
            validationError: { type: GraphQLList(validationErrorGt) },
            data:  { type: dataType ? dataType : GraphQLString },
            message: { type: GraphQLString },
            messageCode: {type: GraphQLString}
        },
    });
}

export const GraphqlGenericReturn = new GraphQLObjectType({
    name: "GraphqlGenericReturn",
    fields: {
        code: { type: GraphQLInt },
        validationError: { type: GraphQLList(validationErrorGt) },
        data: { type: GraphQLString },
        message: { type: GraphQLString },
        messageCode: {type: GraphQLString}
    }
})