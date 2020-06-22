import gql from 'graphql-tag';
import { GET_DRAFT_TODOS, GET_CURRENT_TODO } from "./queries";
import { removeToDo } from "./lib/toDoHelpers";

export const typeDefs = gql`
  extend type Query {
    draftToDos: [ToDo]
    currentToDo: ToDo
  }

  extend type Mutation {
    updateCurrentToDo(newToDo: ToDo): ToDo
    addDraftToDo(draftToDo: ToDo): [ToDo]
    deleteDraftToDo(draftToDo: ToDo): [ToDo]
  }
`;

export const resolvers = {
  Mutation: {
    updateCurrentToDo: (_, { newToDo }, { cache }) => {
      console.log("Inside updateCurrentToDo newToDo: ", newToDo);
      const queryResult = cache.readQuery({ query: GET_CURRENT_TODO });
      console.log("Inside updateCurrentToDo initial queryResult: ", queryResult);
      if (queryResult) {
        const data = {
          currentToDo: newToDo
        };
        cache.writeQuery({ query: GET_CURRENT_TODO, data });
        const updatedQueryResult = cache.readQuery({ query: GET_CURRENT_TODO });
        console.log("Inside updateCurrentToDo updatedQueryResult: ", updatedQueryResult);
      }
      return newToDo;
    },
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
