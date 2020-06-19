const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    toDos: [ToDo]
    toDo(_id: String!): ToDo
  }
  type ToDo {
    _id: ID
    title: String
    completed: Boolean
  }
  type Mutation {
    add_toDo(title: String, completed: Boolean): ToDo
    delete_toDo(_id: ID!): DeletedCount!
    delete_toDos: DeletedCount!
    update_toDo(_id: ID!, title: String!, completed: Boolean!): ToDo
  }
  type DeletedCount {
    deletedCount: Int!
  }
`;

module.exports = typeDefs;
