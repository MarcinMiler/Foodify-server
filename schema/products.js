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

    type Mutation {
        addProduct(name: String! price: Float!, category: String!): Boolean!
        deleteProduct(id: ID!): Boolean!
    }
`