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

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = express()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/foodify', { useMongoClient: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open',() => {
  console.log('open db')
})

server.use('*', cors({ origin: 'http://localhost:3000' }))

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}))

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
    schema
  },
  {
    server: ws,
    path: '/subscriptions',
  })
})