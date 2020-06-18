import { v4 as uuidv4 } from 'uuid';
const { DataSource } = require('apollo-datasource');

const todos = [];

const makeTodo = ({ id, title, completed = false }) => ({
  id,
  title,
  completed,
});

class TodosAPI extends DataSource{
  constructor() {
    super();
    // add default todo
    todos.push(
      makeTodo({
        id: uuidv4(),
        title: 'foo',
      }),
    );
  }

  // leaving this inside the class to make the class easier to test
  toDoReducer(toDo) {
    return {
      id: toDo.id,
      title: toDo.title,
      completed: toDo.completed
    };
  }

  // Todo.find().then((todos) => todos);
  async getAllToDos() {
    const response = await this.get('toDos');

    // transform the raw toDos to a more friendly
    return Array.isArray(response)
      ? response.map((toDo) => this.toDoReducer(toDo))
      : [];
  }
  async createTodo({ title, id, completed }) {
    const toDos = await this.store.toDos.findOrCreate({
      where: { title, id, completed },
    });
    return toDos && toDos[0] ? toDos[0] : null;
  }
  async updateTodo({ title, id, completed }) {
    return !!this.store.toDos.update({ where: { title, id, completed } });
  }
  async removeTodo({ title, id, completed }) {
    return !!this.store.toDos.destroy({ where: { title, id, completed } });
  }
}

export default TodosAPI;
