/**
 * addToDo
 * 
 * @param {any} list 
 * @param {any} item 
 */
export const addToDo = (list, item) => [item, list]

/**
 * generateId
 * 
 */
export const generateId = () => Math.floor(Math.random() * 100000)

/**
 * findById
 * 
 * @param {any} id 
 * @param {any} list 
 */
export const findById = (id, list) => list.find(item => item._id === id)


/**
 * toggleToDo
 * 
 * @param {any} toDo 
 */
export const toggleToDo = (toDo) => {
    console.log("Inside toggleToDo");
    console.log(toDo);
    return toDo && { ...toDo, completed: !toDo.completed } 
    
}

/**
 * modifyToDo
 * 
 * @param {any} list 
 * @param {any} updatedItem 
 * @returns 
 */
export const modifyToDo = (list, updatedItem) => { 
    console.log("Inside modifyToDo");
    console.log(list);
    console.log(updatedItem);
    const updatedIndex = list.findIndex(item => item._id === updatedItem._id)

    return [
        ...list.slice(0, updatedIndex),
        updatedItem,
        ...list.slice(updatedIndex + 1)
    ]
}

export const removeToDo = (list, toDoId) => {
    console.log("Inside removeToDo");
    console.log(list);
    console.log(toDoId);
    const toDoIndex = list.findIndex(item => item._id === toDoId)
    return [
        ...list.slice(0, toDoIndex),
        ...list.slice(toDoIndex + 1)
    ]
}

