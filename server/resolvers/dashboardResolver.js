import moment from 'moment'

export default {
    Query: {
        monthBalance: async (parent, args, { models }) => {
            const currentMonthAndYaer = new RegExp(moment().format('MMMM YYYY'))
            
            const orders = await models.OrderModel.find({})

            const balance = orders
                .filter(order => currentMonthAndYaer.test(order.date))
                .reduce((prev, cur) => prev + cur.totalPrice, 0)

            return {
                balance,
                goal: 500,
            }
        },
        weekOrders: async (parent, { limit }, { models }) => {
            let dates = []
            const today = moment().format('ddd')
            let days = 7

            if(limit !== 'last week') days = 30

            for(let i = 0; i < days; i++) {
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
            let res = [{ type: 'Salad', orders: 0 },{ type: 'Dinner', orders: 0 },{ type: 'Fish', orders: 0 },
                       { type: 'Sea food', orders: 0 },{ type: 'Sushi', orders: 0 },{ type: 'Dessert', orders: 0 }]

            const today = moment().format('ddd')

            for(let i = 0; i < 7; i++) {
                let data = moment().subtract(i, 'day').format('DD MMMM YYYY') 
                dates.push(data)
            }

            const reg = new RegExp(dates.join('|'))
        
            const orders = await models.OrderModel.find({}, 'date products')
            const products = await models.ProductModel.find({}, 'id category')
            
            const filtred = orders
            .filter(order => reg.test(order.date))
            .forEach(order => {
                order.products.forEach(product => {
                    const category = products.find(p => p.id === product.productID)
                    
                    res.forEach((r, i) => {
                        if(r.type === category.category) res[i].orders += product.quantity 
                    })
                })
            })

            return res
        },
        balancePerDay: async (parent, args, { models }) => {
            let data = []
            const currentDay = moment().format('DD')
            const currentMonthShort = moment().format('MM')
            const currentMonthLong = moment().format('MMMM')
            const currentYear = moment().format('YYYY')
            const regExp = new RegExp(currentMonthLong)

            const daysInMonth = (month, year) => new Date(year, month, 0).getDate()
            
            for(let i = 0; i < currentDay; i++) {
                let day = { day: moment().startOf('month').add(i, 'day').format('DD MMMM YYYY'), balance: 0 } 
                data.push(day)
            }
            
            const orders = await models.OrderModel.find({}, 'date totalPrice')
            
            const filtred = orders
                .filter(order => regExp.test(order.date))
                .forEach(order => {
                    data.find(d => {
                        if(d.day === order.date) d.balance += order.totalPrice
                    })
                })
            
            data.forEach(d => d.day = d.day.substring(0,6))

            return data
        },
        fullMonthBalance: async (parent, args, { models }) => {
            let data = []
            const currentDay = moment().format('DD')
            const currentMonthLong = moment().format('MMMM')
            const currentYear = moment().format('YYYY')
            const regExp = new RegExp(currentMonthLong)
            

            for(let i = 0; i < currentDay; i++) {
                let day = { day: moment().startOf('month').add(i, 'day').format('DD MMMM YYYY'), balance: 0 } 
                data.push(day)
            }
            
            const orders = await models.OrderModel.find({}, 'date totalPrice')
            
            const filtred = orders
                .filter(order => regExp.test(order.date))
                .forEach(order => {
                    data.find(d => {
                        if(d.day === order.date) d.balance += order.totalPrice
                    })
                })
            
            data.forEach((d, i) => {
                if(i === 0) return d
                d.balance = d.balance += data[i-1].balance
            })
            
            data.forEach(d => d.day = d.day.substring(0,6))
            console.log(currentDay)
            return data
        },
        newUsers: async (parent, args, { models }) => {
            let dates = []
            const today = moment().format('ddd')


            for(let i = 0; i < 7; i++) {
                let data = { day: moment().subtract(i, 'day').format('DD MMMM YYYY'), number: 0 }
                dates.push(data)
            }

            const reg = new RegExp(dates.join('|'))
        
            const users = await models.UserModel.find({}, 'id date')

            const weekUsers = users
                .filter(user => reg.test(user.date))
            
            return dates.map(date => {
                weekUsers.map(user => {
                    if(user.date === date.day) date.number++
                })
                date.day = date.day.substring(0,6)
                return date
            })
            .reverse()
        }
    }
}