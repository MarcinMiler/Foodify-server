export default `
    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String!
        password: String!
        orders: [String!]
    }

    type LoginResponse {
        ok: Boolean!
        token: String
        error: Error
    }

    type RegisterResponse {
        ok: Boolean!
        error: Error
    }

    type Query {
        me: User
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): LoginResponse!
        register(email: String!, password: String!): RegisterResponse!
    }
`