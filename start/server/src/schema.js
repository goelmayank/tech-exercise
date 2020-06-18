const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    toDos: [ToDo] @cacheControl(maxAge: 5)
    toDo(_id: String!): ToDo @cacheControl(maxAge: 5)
  }
  type ToDo {
    _id: ID!
    title: String
    completed: Boolean
  }
  type Mutation {
    add_toDo(title: String, completed: Boolean): ToDo @cacheControl(maxAge: 5)
    delete_toDo(_id: ID!): DeletedCount!
    delete_toDos: DeletedCount!
    update_toDo(_id: ID!, title: String!, completed: Boolean!): ToDo
      @cacheControl(maxAge: 5)
  }
  type DeletedCount {
    deletedCount: Int!
  }
`;

module.exports = typeDefs;
