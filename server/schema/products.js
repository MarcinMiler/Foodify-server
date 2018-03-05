export default `
    type Product {
        id: ID!
        name: String!
        price: Float!
        category: String!
        url: String
    }

    type Query {
        products(category: String!): [Product!]
        allProducts: [Product!]
    }

    type Response {
        ok: Boolean!
        error: Error
    }

    type Mutation {
        addProduct(name: String! price: Float!, category: String! url: String!): Product!
        deleteProduct(id: ID!): ID!
    }
`