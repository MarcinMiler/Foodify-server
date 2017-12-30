import { tryLogin, register } from '../auth.js'

export default {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.UserModel.find({}, 'id firstName lastName email orders')
        },
        me: async (parent, args, { models, user }) => {
            const u = await models.UserModel.findOne({ id: user.id }, 'id firstName lastName email orders')
            return u
        }
    },
    Mutation: {
        login: async (parent, { email, password }, { models, SECRET }) => await tryLogin(email, password, models, SECRET),

        register: async (parent, args, { models }) => await register(args, models),
    }
}