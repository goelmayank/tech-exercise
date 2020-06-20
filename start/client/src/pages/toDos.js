import React, { useState } from "react";

import { ToDoForm, ToDoList } from "../components";
import { findById } from "../lib/toDoHelpers";
import logo from "../assets/images/logo.svg";
import { GET_TODOS } from "../queries";
import "../styles.css";

const ToDos = ({props}) => {
  const {
    addAndRefreshDrafts,
    toDos,
    addToDo,
    deleteToDo,
    updateToDo
  } = props;
  
  const [state, setState] = useState({
    currentToDo: "",
    errorMessage: ""
  });

  const handleToggle = (id, event) => {
    const selectedToDo = findById(id, toDos);
    if (typeof selectedToDo == "undefined") {
      setState({ ...state, errorMessage: "Unable to find to do id in list" });
      return null;
    }
    console.log("variables:", {
        toDoId: selectedToDo._id,
        toDoTitle: selectedToDo.title,
        toDoCompleted: !selectedToDo.completed
      });

    updateToDo({
      variables: {
        toDoId: selectedToDo._id,
        toDoTitle: selectedToDo.title,
        toDoCompleted: !selectedToDo.completed
      },
      refetchQueries: [
        {
          query: GET_TODOS
        }
      ]
    });
  };

  const handleOnchangeInput = event => {
    setState({ ...state, currentToDo: event.target.value, errorMessage: "" });
  };

  const handleSubmit = event => {
    //if id present --> update else create
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
        const updatedToDos = [res.data.add_toDo, toDos];
        setState({ ...state, currentToDo: "" });
      })
      .catch(err => {
        console.log(err);
      });
   
  };

  const handleEmptySubmit = event => {
    event.preventDefault();

    setState({ errorMessage: "Please supply a todo title" });
  };

  const handleEdit = (id, event) => {
    event.preventDefault();
    const oldState = state;
    const selectedToDo = findById(id, toDos);
    if (typeof (selectedToDo) == "undefined") {
      setState({ ...state, errorMessage: "Unable to find to do id in list" });
      return null;
    }
    setState({ ...state, currentToDo: selectedToDo.title });
    
    if (oldState.currentToDo !== "") {
      addAndRefreshDrafts(oldState.currentToDo);      
    }
  };

  const handleRemove = (id, event) => {
    event.preventDefault();

    deleteToDo({
      variables: { toDoId: id },
      refetchQueries: [
        {
          query: GET_TODOS
        }
      ]
    })
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
          toDos={toDos}
          handleEdit={handleEdit}
          handleToggle={handleToggle}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
}

export default ToDos;
