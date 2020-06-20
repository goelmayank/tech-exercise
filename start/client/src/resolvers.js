import gql from 'graphql-tag';

import { GET_DRAFT_TODOS } from "./queries";
import { findById, removeToDo } from "./lib/toDoHelpers";

export const typeDefs = gql`
  extend type Query {
    draftToDos: [ToDo]
  }

  extend type Mutation {
    addDraftToDo(draftToDo: ToDo): [ToDo]
    deleteDraftToDo(draftToDo: ToDo): [ToDo]
  }
`;

export const resolvers = {
         Mutation: {
           addDraftToDo: (_, { draftToDo }, { cache }) => {
             console.log("Inside addDraftToDo draftToDo: ", draftToDo);
             const queryResult = cache.readQuery({ query: GET_DRAFT_TODOS });
             console.log("Inside addDraftToDo initial queryResult: ", queryResult);
             if (queryResult) {
               const { draftToDos } = queryResult;
            
               const data = {
                 draftToDos: [...draftToDos, draftToDo]
               };
               cache.writeQuery({ query: GET_DRAFT_TODOS, data });
               const updatedQueryResult = cache.readQuery({ query: GET_DRAFT_TODOS });
               console.log("Inside addDraftToDo updatedQueryResult: ", updatedQueryResult);
               return data.draftToDos;
             }
             return [];
           },
          deleteDraftToDo: (_, { draftToDo }, { cache }) => {
            console.log("Inside deleteDraftToDo draftToDo: ", draftToDo);
            const queryResult = cache.readQuery({ query: GET_DRAFT_TODOS });
            console.log("Inside deleteDraftToDo initial queryResult: ", queryResult);
            if (queryResult) {
              const { draftToDos } = queryResult;

              const data = {
                draftToDos: removeToDo(draftToDos, draftToDo._id)
              };
              console.log("Inside deleteDraftToDo final data: ", data);
              cache.writeQuery({ query: GET_DRAFT_TODOS, data });
              return data.draftToDos;
            }
            return [];
          }
         }
       };
