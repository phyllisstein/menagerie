import { type NextApiHandler } from 'next'
import { type NextWebSocketHandler } from 'next-plugin-websocket'
import { type WebSocket } from 'ws'

interface Wisp {
  id: string
  position: [number, number, number]
}

const state = new Map<WebSocket, Wisp>()

export const socket: NextWebSocketHandler = (ws, req) => {
  if (!state.has(ws)) {
    ws.addEventListener('close', () => {
      state.delete(ws)
    })

    ws.addEventListener('message', message => {
      const { data } = message

      if (data.type === 'register') {
        const position = [
          Math.floor(Math.random() * 25),
          Math.floor(Math.random() * 250),
          Math.floor(Math.random() * 250),
        ]
        const wisp = { id: data.id, position }
        console.log(wisp)
        state.set(ws, wisp)
        const states = Array.from(state.values())
        ws.send(JSON.stringify({ type: 'update', data: states }))
      }
    })
  }

  const states = Array.from(state.values())
  console.log(states)
  ws.send(JSON.stringify({ type: 'update', data: states }))
}

const handler: NextApiHandler = async (req, res) => {
  res.status(426).send('Upgrade required')
}

export default handler
