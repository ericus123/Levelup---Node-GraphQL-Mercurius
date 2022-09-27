const schema = `
 
directive @auth(
    requires: Role = ADMIN,
  ) on OBJECT | FIELD_DEFINITION
 
  enum Role {
    ADMIN
    USER
  }
 
type Query {
    user(id: ID!): User! @auth(requires: ADMIN)
    users: [User]! @auth(requires: ADMIN)
    login(username:String!, password:String!): String
}
 
type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
}
`;

export default schema;
