export default `
    type Product {
        id: ID!
        name: String!
        price: Float!
        category: String!
    }

    type Query {
        products(category: String!): [Product!]
    }

    type Response {
        ok: Boolean!
        error: Error
    }

    type Mutation {
        addProduct(name: String! price: Float!, category: String!): Response!
        deleteProduct(id: ID!): Boolean!
    }
`