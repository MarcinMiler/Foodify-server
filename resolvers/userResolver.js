import { tryLogin, register } from '../auth.js'

export default {
    Query: {
        users: async (parent, args, { models }) => await models.UserModel.find({}, 'id firstName lastName email orders'),
        myOrders: async (parent, args, { models, user }) => await models.OrderModel.find({ clientID: user.id })
    },
    Mutation: {
        login: async (parent, { email, password }, { models, SECRET }) => await tryLogin(email, password, models, SECRET),
        register: async (parent, args, { models }) => await register(args, models),
    }
}