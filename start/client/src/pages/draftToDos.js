import React, { useState } from "react";
import "../styles.css";
import logo from "../assets/images/logo.svg";
import { ToDoForm, ToDoList } from "../components";
import {
  appendToDo,
  findById,
  toggleToDo,
  modifyToDo,
  removeToDo
} from "../lib/toDoHelpers";
import { pipe, partial } from "../lib/utils";
import { GET_TODOS } from "../queries";

const DraftToDos = ({ props }) => {
  // console.log("Inside draftToDos");
  const {
    addOrRemoveFromDraft, 
    draftToDos,
    addToDo,
    deleteToDo,
    updateToDo
  } = props;

  const [state, setState] = useState({
    currentToDo: "",
    errorMessage: "",
    toDos: draftToDos
  });

  const handleToggle = todoId => {
    // console.log("Inside handleToggle");
    //Get updateddraftToDos
    const pipeline = pipe(
      findById,
      toggleToDo,
      partial(modifyToDo, state.toDos)
    );
    const updateddraftToDos = pipeline(todoId, state.toDos);

    setState({ toDos: updateddraftToDos });
  };

  const handleOnchangeInput = event => {
    // console.log("Inside handleOnchangeInput");
    setState({ ...state, currentToDo: event.target.value, errorMessage: "" });
  };

  const handleSubmit = event => {
    // console.log("Inside handleSubmit");
    event.preventDefault();

    let toDoList;
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
        const updatedToDos = appendToDo(this.state.todos, res.data.add_toDo);
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

  const handleRemove = (id, event) => {
    // console.log("Inside handleRemove");
    // console.log(id);
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
        const updateddraftToDos = removeToDo(state.toDos, id);
        setState({ ...state, toDos: updateddraftToDos });
      })
      .catch(err => {
        // console.log(err);
      });
  };

  const submitHandler = state.currentToDo ? handleSubmit : handleEmptySubmit;

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
};

export default DraftToDos;
