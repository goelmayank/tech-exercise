import gql from 'graphql-tag';

import { GET_DRAFT_TODOS } from "./queries";
import { findById, removeToDo } from "./lib/toDoHelpers";

export const typeDefs = gql`
  extend type Query {
    draftToDos: [ToDo]
  }

  extend type Mutation {
    addOrRemoveFromDraft(draftToDo: ToDo): [ToDo]
  }
`;

export const resolvers = {
         Mutation: {
           addOrRemoveFromDraft: (_, { draftToDo }, { cache }) => {
             console.log("Inside addOrRemoveFromDraft draftToDo: ", draftToDo);
             const queryResult = cache.readQuery({ query: GET_DRAFT_TODOS });
             console.log("Inside addOrRemoveFromDraft initial queryResult: ", queryResult);
             if (queryResult) {
               const { draftToDos } = queryResult;
            
               const data = {
                 draftToDos: (typeof (findById(draftToDo._id, draftToDos)) != "undefined")
                   ? removeToDo(draftToDos, draftToDo._id )
                   : [...draftToDos, draftToDo]
               };
               console.log("Inside addOrRemoveFromDraft final data: ", data);
               cache.writeQuery({ query: GET_DRAFT_TODOS, data });
               const updatedQueryResult = cache.readQuery({ query: GET_DRAFT_TODOS });
               console.log("Inside addOrRemoveFromDraft updated queryResult: ", updatedQueryResult);
               return data.draftToDos;
             }
             return [];
           }
         }
       };
