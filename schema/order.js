export default `
    type Order {
        id: ID!
        clientID: ID!
        date: String!
        products: [Products!]
        totalPrice: Float!
        orderStatus: String!
        address: String
        postalCode: String!
        phoneNumber: String!
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
        newOrder(products: [ProcutsInput] address: String! postalCode: String! phoneNumber: String! totalPrice: Int!): Order!
        updateOrderStatus(newStatus: String! id: ID!): Boolean!
    }
`