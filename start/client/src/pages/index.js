import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_TODO,
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  UPDATE_TODO
} from "../queries";

import ToDos from './toDos';
import DraftTodos from './draftToDos';

export default function Pages() {
  const { data, loading, error, fetchMore } = useQuery(GET_TODOS);
  const [addToDo] = useMutation(ADD_TODO);
  const [deleteToDo] = useMutation(DELETE_TODO);
  const [updateToDo] = useMutation(UPDATE_TODO);

  if (loading) return <p>loading.............</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  const props = {
    toDos: data.toDos,
    addToDo,
    deleteToDo,
    updateToDo
  }
  return (
    <Fragment>
      <Router primary={false} component={Fragment}>
        <ToDos path="/" props={props} />
        <DraftTodos path="draftTodos" props={props} />
      </Router>
    </Fragment>
  );
}
