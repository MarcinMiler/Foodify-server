import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    orders: [String]
})

const OrderSchema = new Schema({
    id: String,
    clientID: String,
    date: String,
    products: [{
        productID: String,
        quantity: Number
    }],
    totalPrice: Number,
    orderStatus: String,
    address: String,
    postalCode: String,
    phoneNumber: String
})

const ProductSchema = new Schema({
    id: String,
    name: String,
    price: Number,
    category: String
}) 

const UserModel = mongoose.model('user', UserSchema)
const OrderModel = mongoose.model('order', OrderSchema)
const ProductModel = mongoose.model('product', ProductSchema)

const models = {
    UserModel,
    OrderModel,
    ProductModel
}

export default models