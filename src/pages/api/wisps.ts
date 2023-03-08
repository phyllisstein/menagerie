import Redis from 'ioredis'
import { NextApiHandler } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { NextWebSocketHandler } from 'next-plugin-websocket'
import { Server } from 'socket.io'

const redis = new Redis(
  'redis://default:M1gzHfFkNBqvpfjraO80fu3HkFLUYdRC@redis-17576.c61.us-east-1-3.ec2.cloud.redislabs.com:17576',
)

export default async function socketHandler (req: NextRequest, res: NextResponse) {
  if (res.socket.server.io) {
    return res.socket.server.io
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  io.on('connection', socket => {
    console.log('a user connected')
    const { id } = socket.handshake.query

    socket.broadcast.emit('wisp', {
      id,
      position: {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        z: Math.floor(Math.random() * 500),
      },
    })

    socket.on('wisp', data => {
      socket.broadcast.emit('wisp', data)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
