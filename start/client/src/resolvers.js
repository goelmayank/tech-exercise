import gql from 'graphql-tag';

import { GET_DRAFT_TODOS } from "./queries";
import { findById, removeToDo } from "./lib/toDoHelpers";

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
               return queryResult.draftToDos.includes(toDo);
             }
             return false;
           }
         },
         Mutation: {
           addOrRemoveFromDraft: (_, { draftToDo }, { cache }) => {
             const queryResult = cache.readQuery({ query: GET_DRAFT_TODOS });
             if (queryResult) {
               const { draftToDos } = queryResult;
               const data = {
                        
                 draftToDos: (findById(draftToDo._id, draftToDos) !== -1)
                   ? removeToDo(draftToDos, draftToDo._id )
                   : [...draftToDos, draftToDo]
               };
               cache.writeQuery({ query: GET_DRAFT_TODOS, data });
               return data.draftToDos;
             }
             return [];
           }
         }
       };
