import React from 'react'
import { ToDoItem } from './ToDoItem'
import PropTypes from 'prop-types'

export const ToDoList = props => { 
  console.log("Inside ToDoList", props.toDos);
      return (
        <ul className="todoList">
          {props.toDos &&
            props.toDos.map(todo => (
              <ToDoItem
                key={todo._id}
                {...todo}
                handleEdit={props.handleEdit}
                handleToggle={props.handleToggle}
                handleOnchangeCheckbox={props.handleOnchangeCheckbox}
                handleRemove={props.handleRemove}
              />
            ))}
        </ul>
      );
}

ToDoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleOnchangeCheckbox: PropTypes.func,
    handleRemove: PropTypes.func.isRequired
}
