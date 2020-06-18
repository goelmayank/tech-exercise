import gql from 'graphql-tag';

import { GET_DRAFT_TODOS } from "./queries";

export const typeDefs = gql`
  extend type Query {
    draftToDos: [ID!]!
  }

  extend type ToDo {
    isInDraft: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromDraft(id: ID!): [ID!]!
  }
`;

export const resolvers = {
         ToDo: {
           isInDraft: (
             toDo,
             _,
             { cache }
           ) => {
             const queryResult =
               cache.readQuery({ query: GET_DRAFT_TODOS });
             if (queryResult) {
               return queryResult.draftToDos.includes(toDo._id);
             }
             return false;
           }
         },
         Mutation: {
           addOrRemoveFromDraft: (_, { id }, { cache }) => {
             const queryResult = cache.readQuery({ query: GET_DRAFT_TODOS });
             if (queryResult) {
               const { draftToDos } = queryResult;
               const data = {
                 draftToDos: draftToDos.includes(id)
                   ? draftToDos.filter(i => i !== id)
                   : [...draftToDos, id]
               };
               cache.writeQuery({ query: GET_DRAFT_TODOS, data });
               return data.draftToDos;
             }
             return [];
           }
         }
       };
