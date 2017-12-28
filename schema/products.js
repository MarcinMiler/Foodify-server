export default `
    type Product {
        id: String!
        name: String!
        price: String!
        category: String!
    }

    type Query {
        products(categoty: String!): [Product!]
    }
`