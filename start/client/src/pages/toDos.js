import React, { useState } from "react";


import { ToDoForm, ToDoList } from "../components";
import logo from "../assets/images/logo.svg";
import "../styles.css";

import {
  generateId,
  findById,
  toggleToDo,
  modifyToDo,
  removeToDo
} from "../lib/toDoHelpers";
import { pipe, partial } from "../lib/utils";
import { GET_TODOS, GET_DRAFT_TODOS } from "../queries";

const ToDos = ({props}) => {
  // console.log("Inside ToDos");
  const {
    addDraftToDo,
    refetchDraftToDos,
    draftToDos,
    toDos,
    addToDo,
    deleteToDo,
    // updateToDo
  } = props;
  
  const [state, setState] = useState({
    currentToDo: "",
    errorMessage: "",
    toDos
  });

  const handleToggle = todoId => {
    // console.log("Inside handleToggle");
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
    // console.log("Inside handleOnchangeInput");
    setState({ ...state, currentToDo: event.target.value, errorMessage: "" });
  };

  const handleSubmit = event => {
    // console.log("Inside handleSubmit");
    event.preventDefault();

    addToDo({
      variables: {
        toDoTitle: state.currentToDo,
        toDoCompleted: false
      },
      refetchQueries: [
        {
          query: GET_TODOS
        }
      ]
    })
      .then(res => {
        // console.log(state.toDos);
        const updatedToDos = [res.data.add_toDo, ...state.todos];
        setState({ ...state, toDos: updatedToDos, currentToDo: "" });
      })
      .catch(err => {
        // console.log(err);
      });
   
  };

  const handleEmptySubmit = event => {
    // console.log("Inside handleEmptySubmit");
    event.preventDefault();

    setState({ errorMessage: "Please supply a todo title" });
  };

  const handleEdit = (id, event) => {
    event.preventDefault();
    const oldState = state;
    const selectedToDo = findById(id, state.toDos);
    if (typeof (selectedToDo) == "undefined") {
      setState({ ...state, errorMessage: "Unable to find to do id in list" });
      return null;
    }
    setState({ ...state, currentToDo: selectedToDo.title });
    
    if (oldState.currentToDo !== "") {
      const draftToDo = {
        _id: generateId(),
        title: oldState.currentToDo,
        completed: false
      }
      addDraftToDo({
        variables: { draftToDo },
      });
      refetchDraftToDos().then(res => {
        console.log("Inside handleEdit after refetch res: ", res.data);
      })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleRemove = (id, event) => {
    // console.log("Inside handleRemove");
    event.preventDefault();

    deleteToDo({
      variables: { toDoId: id },
      refetchQueries: [
        {
          query: GET_TODOS
        }
      ]
    })
      .then(res => {
        const updatedToDos = removeToDo(state.toDos, id);
        setState({ ...state, toDos: updatedToDos });
      })
      .catch(err => {
        // console.log(err);
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
          handleEdit={handleEdit}
          handleToggle={handleToggle}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
}

export default ToDos;
