import React, { useState } from "react";

import logo from "../assets/images/logo.svg";
import { ToDoForm, ToDoList } from "../components";
import {
  // addToDo,
  // generateId,
  findById,
  toggleToDo,
  modifyToDo,
  removeToDo
} from "../lib/toDoHelpers";
import { pipe, partial } from "../lib/utils";

const DraftToDos = ({ props }) => {
  console.log("Inside DraftToDos");
  const { toDos, addToDo, deleteToDo, updateToDo } = props;

  const [state, setState] = useState({
    currentToDo: "",
    errorMessage: "",
    toDos
  });

  const handleToggle = todoId => {
    console.log("Inside handleToggle");
    //Get updatedDraftToDos
    const pipeline = pipe(
      findById,
      toggleToDo,
      partial(modifyToDo, state.toDos)
    );
    const updatedDraftToDos = pipeline(todoId, state.toDos);

    setState({ toDos: updatedDraftToDos });
  };

  const handleOnchangeInput = event => {
    console.log("Inside handleOnchangeInput");
    setState({ ...state, currentToDo: event.target.value, errorMessage: "" });
  };

  const handleSubmit = event => {
    console.log("Inside handleSubmit");
    console.log(state);
    event.preventDefault();

    let toDoList;
    addToDo({
      variables: {
        toDoTitle: state.currentToDo,
        toDoCompleted: false
      }
    })
      .then(res => {
        console.log(state.toDos);
        const newDraftToDos = [res.data.add_toDo].concat(state.toDos);
        console.log(newDraftToDos);
        setState({ ...state, toDos: newDraftToDos, currentToDo: "" });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEmptySubmit = event => {
    console.log("Inside handleEmptySubmit");
    event.preventDefault();

    setState({ errorMessage: "Please supply a todo title" });
  };

  const handleRemove = (id, event) => {
    console.log("Inside handleRemove");
    console.log(id);
    event.preventDefault();

    deleteToDo({ variables: { toDoId: id } })
      .then(res => {
        const updatedDraftToDos = removeToDo(state.toDos, id);
        setState({ ...state, toDos: updatedDraftToDos });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const submitHandler = state.currentToDo ? handleSubmit : handleEmptySubmit;

  return (
    <div className="DraftToDos">
      <header className="DraftToDos-header">
        <img src={logo} className="DraftToDos-logo" alt="logo" />
        <h1 className="DraftToDos-title">React DraftToDos</h1>
      </header>
      <div className="todoWrDraftToDoser">
        {state.errorMessage && (
          <div className="errorMessage">{state.errorMessage}</div>
        )}

        <ToDoForm
          handleSubmit={submitHandler}
          currentToDo={state.currentToDo}
          handleOnchangeInput={handleOnchangeInput}
        />

        <ToDoList
          toDos={state.toDos}
          handleToggle={handleToggle}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
};

export default DraftToDos;
