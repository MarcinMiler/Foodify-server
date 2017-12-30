export default `
    type Order {
        id: ID!
        clientID: ID!
        date: String!
        products: [Products!]
        totalPrice: Float!
        orderStatus: String!
        adress: String!
    }

    type Products {
        productID: ID!
        quantity: Int!
    }

    input ProcutsInput {
        productID: ID!
        quantity: Int!
    }

    type Mutation {
        newOrder(products: [ProcutsInput] adress: String! totalPrice: Float!): Order!
        updateOrderStatus(newStatus: String! id: ID!): Boolean!
    }
`