import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import models from './models/models'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

export const SECRET = 'asd@#$NSNCSK@Jasdij@#bas4bsdi48hsjdknk'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const storage = multer.diskStorage({
  destination: './static/uploads/',
  filename: (req, file, cb) => cb(null, `${file.originalname}`) 
})

const upload = multer({
  storage
})

const server = express()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/foodify', { useMongoClient: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open',() => {
  console.log('open db')
})

const addUser = async (req, res, next) => {
  const token = req.headers['x-token']
  
  if (token) {
    try {
      const { id } = jwt.verify(token, SECRET)
      const user = { id }
      console.log(user)
      req.user = user
    } catch(err) {}
  }
  next()
}

server.use(addUser)
server.use(cors('*'))
server.use(express.static('static'))

server.post('/upload', upload.any(), (req, res) => {
  res.json({ok: true})
})

server.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: {
    models,
    SECRET,
    user: req.user
  }
})))

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
}))

const ws = createServer(server)

let port = process.env.PORT || 4000

ws.listen(port, () => {
  console.log('Server is running on port 4000')

  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  },
  {
    server: ws,
    path: '/subscriptions',
  })
})
