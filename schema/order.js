export default `
    type Order {
        id: String!
        clientID: String!
        date: String!
        products: [Products!]
        totalPrice: String!
        orderStatus: String!
        adress: String!
    }

    type Products {
        productID: String!
        quantity: Int!
    }

    type Query {
        order(id: ID!): [Order]
    }
`