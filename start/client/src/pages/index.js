import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  ADD_DRAFT_TODO,
  REMOVE_DRAFT_TODO,
  GET_DRAFT_TODOS,
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO
} from "../queries";

import ToDos from './toDos';
import DraftToDos from "./draftToDos";

export default function Pages() {
  const draft = useQuery(GET_DRAFT_TODOS);
  const draftToDos = draft.data.draftToDos;
  const draftLoading = draft.loading;
  const draftError = draft.error;
  const refetchDraftToDos = draft.refetch;
  
  const [addDraftToDo] = useMutation(ADD_DRAFT_TODO);
  const [deleteDraftToDo] = useMutation(REMOVE_DRAFT_TODO);
  const { data, loading, error } = useQuery(GET_TODOS);
  const [addToDo] = useMutation(ADD_TODO);
  const [deleteToDo] = useMutation(DELETE_TODO);
  const [updateToDo] = useMutation(UPDATE_TODO);

  if (loading || draftLoading) return <p>loading.............</p>;
  if (error || draftError)
    return (
      <p>
        ERROR: {(error && error.message) || (draftError && draftError.message)}
      </p>
    );

  const props = {
    draftToDos,
    refetchDraftToDos,
    addDraftToDo,
    deleteDraftToDo,
    toDos: data.toDos,
    addToDo,
    deleteToDo,
    updateToDo
  }
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <ToDos path="/" props={props} />
        <DraftToDos path="/draftToDos" props={props} />
      </Router>
    </Fragment>
  );
}
