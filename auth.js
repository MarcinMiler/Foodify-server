import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uuid from 'uuid/v4'

const createToken = async (id, SECRET) => {
    const token = jwt.sign({ id: id }, SECRET, { expiresIn: '1y' })
    return token
}

export const register = async (args, models) => {
    const { email, password } = args

    if(await models.UserModel.findOne({ email })){
        return {
            ok: false,
            error: { message: 'Email is taken' }
        }
    }

    const hash = await bcrypt.hash(password, 12)
    const id = uuid()

    const user = new models.UserModel({
        id,
        email,
        password: hash,
    })

    user.save()
    return {
        ok: true
    }
}

export const tryLogin = async (email, password, models, SECRET) => {
    const user = await models.UserModel.findOne({ email })
    
    if(!user) {
        return {
            ok: false,
            error: { message: 'Wrong email' }
        }
    }

    const valid = await bcrypt.compare(password, user.password)
    if(!valid) {
        return {
            ok: false,
            error: { message: 'Wrong password' }
        }
    }

    const token = await createToken(user.id, SECRET)
    return {
        ok: true,
        token
    }
}