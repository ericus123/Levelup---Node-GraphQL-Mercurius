const schema = `
  type Query {
    users: [User]!
  }
 
  type User {
    id: ID!
  }
  `;
export default schema;
