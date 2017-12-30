import uuid from 'uuid/v4'

export default {
    Mutation: {
        newOrder: async (parent, { products, adress, totalPrice }, { models, user}) => {

            const order = new models.OrderModel({
                id: uuid(),
                clientID: uuid(),
                date: 'as8923',
                products,
                totalPrice,
                orderStatus: 'Order Confirmed',
                adress,
            })

            await models.UserModel.update({ id: user.id }, { $push: { orders: order }})
            order.save()

            return order
        },
        updateOrderStatus: async (parent, { newStatus, id }, { models }) => {
            await models.OrderModel.update({ id }, { orderStatus: newStatus })
            return true
        }
    }
}