export default `
    type BalanceResponse {
        balance: Float!
        goal: Float!
    }

    type WeekOrderResponse {
        day: String!
        orders: Int!
    }

    type PopularFoodResponse {
        type: String!
        orders: Int!
    }

    type MonthBalanceResponse {
        day: String!
        balance: Float!
    }

    type NewUsersResponse {
        day: String!
        number: Int!
    }

    type Query {
        monthBalance: BalanceResponse!
        weekOrders(limit: String!): [WeekOrderResponse!]
        popularFood: [PopularFoodResponse!]
        balancePerDay: [MonthBalanceResponse!]
        fullMonthBalance: [MonthBalanceResponse!]
        newUsers: [NewUsersResponse!]
    }
`