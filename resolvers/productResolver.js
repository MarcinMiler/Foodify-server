import uuid from 'uuid/v4'

export default {
    Query: {
        products: async (parent, { category }, { models }) =>  await models.ProductModel.find({ category }),
        allProducts: async (parent, args, { models }) =>  await models.ProductModel.find({})
    },
    Mutation: {
        addProduct: async (parent, { name, price, category, url }, { models, user }) => {
            const product = new models.ProductModel({
                id: uuid(),
                name,
                price,
                category,
                url
            })
            product.save()
            return product
        },
        deleteProduct: async (parent, { id }, { models, user }) => {
            await models.ProductModel.remove({ id })
            return id
        }
    }
}