export default `
    type User {
        id: String!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        orders: [String]
    }

    type Query {
        users: [User]
        orders: [Order]
    }
`