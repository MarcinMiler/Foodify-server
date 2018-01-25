import uuid from 'uuid/v4'
import moment from 'moment'

export default {
    Mutation: {
        newOrder: async (parent, { products, adress, postalCode, phoneNumber, totalPrice }, { models, user }) => {
            const order = new models.OrderModel({
                id: uuid(),
                clientID: uuid(),
                date: moment().format("MMM Do YY"),
                products,
                totalPrice,
                orderStatus: 'Order Confirmed',
                adress,
                postalCode,
                phoneNumber
            })
            await models.UserModel.update({ id: user.id }, { $push: { orders: order }})

            return order
        },
        updateOrderStatus: async (parent, { newStatus, id }, { models }) => {
            await models.OrderModel.update({ id }, { orderStatus: newStatus })
            return true
        }
    }
}