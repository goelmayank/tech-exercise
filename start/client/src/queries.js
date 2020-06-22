import gql from "graphql-tag";

export const GET_CURRENT_TODO = gql`
  query GetCurrentToDo {
    currentToDo @client {
      _id
      title
      completed
    }
  }
`;

export const UPDATE_CURRENT_TODO = gql`
  query updateCurrentToDo {
    updateCurrentToDo @client
  }
`;

export const GET_DRAFT_TODOS = gql`
  query GetdraftToDos {
    draftToDos @client
  }
`;

export const ADD_DRAFT_TODO = gql`
  mutation addDraftToDo($draftToDo: ToDo!) {
    addDraftToDo(draftToDo: $draftToDo) @client
  }
`;

export const REMOVE_DRAFT_TODO = gql`
  mutation deleteDraftToDo($draftToDo: ToDo!) {
    deleteDraftToDo(draftToDo: $draftToDo) @client
  }
`;

export const GET_TODOS = gql`
    {
        toDos {
            _id
            title
            completed
        }
    }`

export const GET_TODO = gql`
         query toDo($toDoId: ID!) {
           toDo(_id: $toDoId) {
             _id
             title
             completed
           }
         }
       `;

export const ADD_TODO = gql`
         mutation add_toDo($toDoTitle: String, $toDoCompleted: Boolean) {
           add_toDo(title: $toDoTitle, completed: $toDoCompleted) {
             _id
             title
             completed
           }
         }
       `;

export const DELETE_TODO = gql`
         mutation delete_toDo($toDoId: ID!) {
           delete_toDo(_id: $toDoId) {
             deletedCount
           }
         }
       `;

export const DELETE_TODOS = gql`
    mutation {
        delete_toDos {
            deletedCount
        }
    }`;

export const UPDATE_TODO = gql`
         mutation update_toDo(
           $toDoId: ID!
           $toDoTitle: String
           $toDoCompleted: Boolean
         ) {
           update_toDo(
             _id: $toDoId
             title: $toDoTitle
             completed: $toDoCompleted
           ) {
             _id
             title
             completed
           }
         }
       `;
