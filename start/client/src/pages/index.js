import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_CURRENT_TODO,
  UPDATE_CURRENT_TODO,
  ADD_DRAFT_TODO,
  REMOVE_DRAFT_TODO,
  GET_DRAFT_TODOS,
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "../queries";

import {
  generateId
} from "../lib/toDoHelpers";

import ToDos from './toDos';
import DraftToDos from "./draftToDos";

export default function Pages() {
  const currentToDoQuery = useQuery(GET_CURRENT_TODO);
  console.log('Inside pages currentToDoQuery', currentToDoQuery);
  // const currentToDo = currentToDoQuery.data.currentToDo;
  const currentToDoLoading = currentToDoQuery.loading;
  const currentToDoError = currentToDoQuery.error;

  const draft = useQuery(GET_DRAFT_TODOS);
  const draftToDos = draft.data.draftToDos;
  const draftLoading = draft.loading;
  const draftError = draft.error;
  
  // const [updateCurrentToDo] = useMutation(UPDATE_CURRENT_TODO);
  const [addDraftToDo] = useMutation(ADD_DRAFT_TODO);
  const [deleteDraftToDo] = useMutation(REMOVE_DRAFT_TODO);
  const { data, loading, error } = useQuery(GET_TODOS);
  const [addToDo] = useMutation(ADD_TODO);
  const [deleteToDo] = useMutation(DELETE_TODO);
  const [updateToDo] = useMutation(UPDATE_TODO);

  // const modifyCurrentToDo = (args) => {
  //   const newToDo = {
  //     _id: args._id,
  //     title: args.title || "",
  //     completed: args.completed || false
  //   }
  //   updateCurrentToDo({
  //     variables: { newToDo },
  //     refetchQueries: [
  //       {
  //         query: GET_CURRENT_TODO
  //       }
  //     ]
  //   });
  // }

  if (loading || draftLoading || currentToDoLoading) return <p>loading.............</p>;
  if (error || draftError || currentToDoError)
    return (
      <p>
        ERROR: {(error && error.message) || (draftError && draftError.message)}
      </p>
    );

  const props = {
    // currentToDo,
    // modifyCurrentToDo,
    draftToDos,
    addDraftToDo,
    deleteDraftToDo,
    toDos: data.toDos,
    addToDo,
    deleteToDo,
    updateToDo
  }
  console.log('Inside pages draftToDos', draft.data.draftToDos);
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <ToDos path="/" props={props} />
        <DraftToDos path="/draftToDos" props={props} />
      </Router>
    </Fragment>
  );
}
