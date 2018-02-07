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

    type Query {
        monthBalance: BalanceResponse!
        weekOrders: [WeekOrderResponse!]
        popularFood: [PopularFoodResponse!]
        balancePerDay: [MonthBalanceResponse!]
        fullMonthBalance: [MonthBalanceResponse!]
    }
`