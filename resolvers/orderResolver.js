import uuid from 'uuid/v4'
import moment from 'moment'
import { pubsub } from '../index'

export default {
    Query: {
        allOrders: async (parent, args, { models }) => await models.OrderModel.find({}),
        currentOrders: async (parent, args, { models }) => {
            const orders = await models.OrderModel.find({})
            return orders.filter(order => order.orderStatus !== 'Order complete')
        }
    },
    Mutation: {
        newOrder: async (parent, { products, adress, date, postalCode, phoneNumber, totalPrice, id }, { models, user }) => {
            const order = new models.OrderModel({
                id: uuid(),
                clientID: id,
                // date: moment().format("MMM Do YY"),
                date,
                products,
                totalPrice,
                orderStatus: 'Order placed',
                address: 'Strzelce Male',
                postalCode: '97-515',
                phoneNumber: '123456789'
            })
            pubsub.publish('newOrder', order)

            await models.UserModel.update({ id }, { $push: { orders: order.id }})
            order.save()

            return order
        },
        updateOrderStatus: async (parent, { newStatus, id }, { models }) => {
            await models.OrderModel.update({ id }, { orderStatus: newStatus })
            return true
        }
    },
    Subscription: {
        newOrder: {
            resolve: (payload, args) => payload,
            subscribe: () => pubsub.asyncIterator('newOrder')
          }
    }
}