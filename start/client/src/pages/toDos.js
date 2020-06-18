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

const ToDos = ({props}) => {
  console.log("Inside ToDos");
  const {
    toDos,
    addToDo,
    deleteToDo,
    updateToDo
  } = props;
  
  const [state, setState] = useState({
    currentToDo: "",
    errorMessage: "",
    toDos
  });

  const handleToggle = todoId => {
    console.log("Inside handleToggle");
    //Get updatedToDos
    const pipeline = pipe(
      findById,
      toggleToDo,
      partial(modifyToDo, state.toDos)
    );
    const updatedToDos = pipeline(todoId, state.toDos);

    setState({ toDos: updatedToDos });
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
        toDoCompleted : false
      }
    })
      .then(res => {
        console.log(state.toDos);
        const newToDos = [res.data.add_toDo].concat(state.toDos)
        console.log(newToDos);
        setState({ ...state, toDos: newToDos, currentToDo: "" });
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
    console.log(id)
    event.preventDefault();

    deleteToDo({ variables: { toDoId: id } })
      .then(res => {
          const updatedToDos = removeToDo(state.toDos, id);
          setState({...state, toDos: updatedToDos});
      })
      .catch(err => {
        console.log(err);
      });
  };

  const submitHandler = state.currentToDo
    ? handleSubmit
    : handleEmptySubmit;

  return (
    <div className="ToDos">
      <header className="ToDos-header">
        <img src={logo} className="ToDos-logo" alt="logo" />
        <h1 className="ToDos-title">React ToDos</h1>
      </header>
      <div className="todoWrToDoser">
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
}

export default ToDos;
