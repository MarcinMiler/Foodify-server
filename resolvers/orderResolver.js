import uuid from 'uuid/v4'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { pubsub, SECRET } from '../index'

export default {
    Query: {
        allOrders: async (parent, args, { models }) => await models.OrderModel.find({}),
        currentOrders: async (parent, args, { models }) => {
            const orders = await models.OrderModel.find({})
            return orders.filter(order => order.orderStatus !== 'Order complete')
        }
    },
    Mutation: {
        newOrder: async (parent, { products, address, postalCode, phoneNumber, totalPrice }, { models, user }) => {
            const order = new models.OrderModel({
                id: uuid(),
                clientID: user.id,
                date: moment().format('DD MMMM YYYY'),
                products,
                totalPrice,
                orderStatus: 'Order placed',
                address,
                postalCode,
                phoneNumber,
            })
            pubsub.publish('newOrder', order)

            await models.UserModel.update({ id: user.id }, { $push: { orders: order.id }})
            order.save()

            return order
        },
        updateOrderStatus: async (parent, { newStatus, id }, { models }) => {
            await models.OrderModel.update({ id }, { orderStatus: newStatus })
            let order = await models.OrderModel.findOne({ id })

            pubsub.publish('newStatus', order)
            return true
        }
    },
    Subscription: {
        newOrder: {
            resolve: (payload, args) => payload,
            subscribe: () => pubsub.asyncIterator('newOrder')
        },
        newStatus: {
            resolve: (payload, args, context) => {
                const { id } = jwt.verify(args.token, SECRET)
                if(id === payload.clientID) return payload
            },
            subscribe: () => pubsub.asyncIterator('newStatus')
        },
    }
}