import React from 'react'
import PropTypes from 'prop-types'
import { partial } from '../lib/utils';

export const ToDoItem = props => { 
    const handleEdit = partial(props.handleEdit, props._id);
    const handleToggle = partial(props.handleToggle, props._id)
    const handleRemove = partial(props.handleRemove, props._id)

    return (
      <li>
        <label htmlFor={props._id}>
          <input
            type="checkbox"
            id={props._id}
            checked={props.checked}
            onChange={handleToggle}
          />
          {props.title}
        </label>
        <a href="#" title="Edit ToDo" onClick={handleEdit}>
          Edit
        </a>
        <a href="#" title="Remove ToDo" onClick={handleRemove}>
          x
        </a>
      </li>
    );
}

ToDoItem.propTypes = {
    id: PropTypes.number.isRequired,
    checked: PropTypes.bool,
    title: PropTypes.string.isRequired
}