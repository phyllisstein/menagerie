#!/usr/bin/env node

import { createServer } from 'http'

import next from 'next'
import { Server } from 'socket.io'

const {
  HOSTNAME = '0.0.0.0',
  NODE_ENV = 'development',
  PORT = '3000',
} = process.env

const dev = NODE_ENV === 'development'
const portNumber = Number.parseInt(PORT, 10)

const io = new Server({
  cors: {
    origin: '*',
  },
})

const state = {}
const sockets = new WeakMap()

io.on('connection', socket => {
  socket.on('disconnect', () => {
    if (!sockets.has(socket)) return

    const id = sockets.get(socket)
    delete state[id]
    sockets.delete(socket)

    io.emit('update', {
      state,
    })
  })

  socket.on('update', data => {
    sockets.set(socket, data.id)
    state[data.id] = data

    io.emit('update', {
      state,
    })
  })
})
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res)
  }).listen(portNumber, HOSTNAME, err => {
    if (err) throw err
  })

  io.attach(httpServer)
})
