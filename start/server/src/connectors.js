import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

Mongoose.connect(process.env.MONGODB_URL);

const ToDoSchema = Mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: false,
  },
});

const ToDo = Mongoose.model('toDos', ToDoSchema);

export { ToDo };
