import React from 'react'
import PropTypes from 'prop-types'

export const ToDoForm = props => { 
    return(
        <form onSubmit={props.handleSubmit}>
            <input focus="true" type="text" value={props.currentToDo} onChange={props.handleOnchangeInput} />
          </form>
    )
}

ToDoForm.propTypes = {
    currentToDo: PropTypes.string.isRequired,
    handleOnchangeInput: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}