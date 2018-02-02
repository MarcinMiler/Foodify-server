import moment from 'moment'

export default {
    Query: {
        monthBalance: async (parent, args, { models }) => {
            const currentMonthAndYaer = new RegExp(moment().format('MMMM YYYY'))``
            
            const orders = await models.OrderModel.find({})

            const balance = orders
                .filter(order => currentMonthAndYaer.test(order.date))
                .reduce((prev, cur) => prev + cur.totalPrice, 0)

            return {
                balance,
                goal: 500,
            }
        },
        weekOrders: async (parent, args, { models }) => {
            let dates = []
            const today = moment().format('ddd')


            for(let i = 0; i < 7; i++) {
                let data = { day: moment().subtract(i, 'day').format('DD MMMM YYYY'), orders: 0 }
                dates.push(data)
            }

            const reg = new RegExp(dates.join('|'))
        
            const orders = await models.OrderModel.find({}, 'date')

            const weekOrders = orders
                .filter(order => reg.test(order.date))

            return dates.map(date => {
                weekOrders.map(order => {
                    if(order.date === date.day) date.orders++
                })
                date.day = date.day.substring(0,6)
                return date
            })
            .reverse()
        },
        popularFood: async (parent, args, { models }) => {
            let dates = []
            let res = [{ type: 'Salads', orders: 0 },{ type: 'Meat', orders: 0 },{ type: 'Fishes', orders: 0 },
                       { type: 'SeaFood', orders: 0 },{ type: 'Sushi', orders: 0 },{ type: 'Dessert', orders: 0 }]

            const today = moment().format('ddd')

            for(let i = 0; i < 7; i++) {
                let data = moment().subtract(i, 'day').format('DD MMMM YYYY') 
                dates.push(data)
            }

            const reg = new RegExp(dates.join('|'))
        
            const orders = await models.OrderModel.find({}, 'date products')

            const filtred = orders.filter(order => reg.test(order.date))


            return res
        }
    }
}