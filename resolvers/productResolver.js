import uuid from 'uuid/v4'

export default {
    Query: {
        products: async (parent, { category }, { models, user }) =>  await models.ProductModel.find({ category })
    },
    Mutation: {
        addProduct: async (parent, { name, price, category }, { models, user }) => {
            const product = new models.ProductModel({
                id: uuid(),
                name,
                price,
                category
            })
            product.save()
            return {
                ok: true
            }
        },
        deleteProduct: async (parent, { id }, { models, user }) => {
            await models.ProductModel.remove({ id })
            return true
        }
    }
}