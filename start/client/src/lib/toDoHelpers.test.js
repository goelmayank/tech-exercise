import { addToDo , findById, toggleToDo, updateToDo, removeToDo } from './toDoHelpers'

test('addToDo should add toDo to the list', () => {
    const startToDos = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false }
    ]

    const newToDo = { id: 3, name: 'three', isComplete: false }
    
    const expected = [
        { id: 3, name: 'three', isComplete: false },
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false }
    ]

    const result = addToDo(startToDos, newToDo)
    
    expect(result).toEqual(expected)
})

test('addToDo should not mutate the existing toDo array', () => { 
    const startToDos = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false }
    ]

    const newToDo = { id: 3, name: 'three', isComplete: false }
    
    const expected = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false }
    ]
 
    const result = addToDo(startToDos, newToDo)

    expect(result).not.toBe(startToDos)
})

test('findById should return the expected item from array', () => { 
    const startToDos = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false }
    ]

    const expected = { id: 2, name: 'two', isComplete: false }

    const result = findById(2, startToDos)

    expect(result).toEqual(expected)
})

test('toggleToDo should toggle isComplete prop of a toDo', () => {
    const startToDo = { id: 1, name: 'one', isComplete: false }
    const expected = { id: 1, name: 'one', isComplete: true }

    const result = toggleToDo(startToDo)

    expect(result).toEqual(expected)
})

test('toggleToDo should not mutate toDo', () => { 
    const startToDo = { id: 1, name: 'one', isComplete: false }
    const result = toggleToDo(startToDo)

    expect(result).not.toBe(startToDo)
})

test('updateToDo should update an item by id', () => { 
    const startToDos = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false }
    ]

    const updatedToDo = { id: 2, name: 'two', isComplete: true }

    const expectedToDo = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: true },
        { id: 3, name: 'three', isComplete: false }
    ]

    const result = updateToDo(startToDos, updatedToDo)

    expect(result).toEqual(expectedToDo)
})

test('updateToDo should not mutate the original array', () => { 
    const startToDos = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        { id: 3, name: 'three', isComplete: false }
    ]

    const updatedToDo = { id: 2, name: 'two', isComplete: true }

    const result = updateToDo(startToDos, updatedToDo)

    expect(result).not.toBe(startToDos)
})

test('removeToDo should remove toDo from toDos by id', () => {
    const startToDos = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        {id: 3, name: 'three', isComplete: false}
    ]

    const expected = [
        { id: 1, name: 'one', isComplete: false },
        {id: 3, name: 'three', isComplete: false}
    ]

    const result = removeToDo(startToDos, 2)

    expect(result).toEqual(expected)
})

test('removeToDo by id should not mutate', () => { 
    const startToDos = [
        { id: 1, name: 'one', isComplete: false },
        { id: 2, name: 'two', isComplete: false },
        {id: 3, name: 'three', isComplete: false}
    ]

    const expected = [
        { id: 1, name: 'one', isComplete: false },
        {id: 3, name: 'three', isComplete: false}
    ]

    const result = removeToDo(startToDos, 2)

    expect(result).not.toBe(expected)
})
