import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  TOGGLE_DRAFT,
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
  
  const [addOrRemoveFromDraft] = useMutation(TOGGLE_DRAFT);

  const { data, loading, error } = useQuery(GET_TODOS);
  const [addToDo, addData] = useMutation(ADD_TODO);
  const [deleteToDo,deleteData] = useMutation(DELETE_TODO);
  const [updateToDo,updateData] = useMutation(UPDATE_TODO);

  if (loading || draftLoading) return <p>loading.............</p>;
  if (error || draftError)
    return (
      <p>
        ERROR: {(error && error.message) || (draftError && draftError.message)}
      </p>
    );

  const props = {
    draftToDos,
    toDos: data.toDos,
    addOrRemoveFromDraft,
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
