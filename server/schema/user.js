export default `
    type User {
        id: ID!
        email: String!
        password: String!
        orders: [String]
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
        myOrders: [Order]
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): LoginResponse!
        register(email: String!, password: String!): RegisterResponse!
    }
`