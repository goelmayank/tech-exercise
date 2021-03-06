import { ToDo } from './connectors';

export default {
  Query: {
    toDos(_, args) {
      console.log('Inside toDos args:', args);
      return ToDo.find().then((toDos) => toDos);
    },
    toDo(_, args) {
      console.log('Inside toDo args:', args);
      return ToDo.findOne({ _id: args._id }).then((toDo) => toDo);
    },
  },
  Mutation: {
    add_toDo: async (_, args) => {
      console.log('Inside add_toDo args:', args);
      let newToDo = new ToDo({ title: args.title, completed: args.completed });
      newToDo.save((err, saved) => {
        if (err) {
          console.log(`Error adding todo: ${err.messages}`);
          return null;
        } else newToDo = saved;
      });
      return newToDo;
    },
    delete_toDo: (_, args) => {
      console.log('Inside delete_toDo args:', args);
      return ToDo.find({ _id: args._id }).remove(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result.deletedCount);
        }
        return {
          deletedCount: result.deletedCount || 0,
        };
      });
    },
    delete_toDos: (_, args) => {
      console.log('Inside delete_toDos args:', args);
      return ToDo.deleteMany({}, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result.deletedCount);
        }
        return {
          deletedCount: result.deletedCount || 0,
        };
      });
    },
    update_toDo: (_, args) => {
      console.log('Inside update_toDo args:', args);
      return ToDo.findById(
        args._id,
        (err) => err && console.log(`Error reading toDo: ${err.messages}`),
      ).then((toDo) => {
        toDo.title = args.title;
        toDo.completed = args.completed;
        toDo.save(
          (err) => err && console.log(`Error saving toDo: ${err.messages}`),
        );
        return toDo;
      });
    },
  },
};
