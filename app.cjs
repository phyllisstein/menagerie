#!/usr/bin/env node

const { createServer } = require('http')

const cors = require('cors')
const express = require('express')
const next = require('next')
const { Server } = require('socket.io')

const {
  HOSTNAME = '0.0.0.0',
  NODE_ENV = 'development',
  PORT = '3000',
  WS_PORT = '3030',
} = process.env

const dev = NODE_ENV === 'development'
const portNumber = Number.parseInt(PORT, 10)
const wsPortNumber = Number.parseInt(WS_PORT, 10)

const wsApp = express()
wsApp.use(cors())

const wsServer = createServer(wsApp)
const io = new Server(wsServer, {
  cors: {
    origin: '*',
  },
})

const state = {}
const sockets = {}

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
    const id = sockets[socket.id]
    delete state[id]
    delete sockets[socket.id]
    console.log(sockets)
    console.log(state)

    io.emit('update', {
      state,
    })
  })

  socket.on('update', data => {
    state[data.id] = data
    sockets[socket.id] = data.id

    console.log(sockets)
    io.emit('update', {
      state,
    })
  })
})

wsServer.listen(wsPortNumber, HOSTNAME, err => {
  if (err) throw err
})

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res)
  }).listen(portNumber, HOSTNAME, err => {
    if (err) throw err
  })
})
