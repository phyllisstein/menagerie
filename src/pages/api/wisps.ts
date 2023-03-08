import { type NextApiHandler } from 'next'
import { type NextWebSocketHandler } from 'next-plugin-websocket'
import { type WebSocket } from 'ws'

const sockets = new Set<WebSocket>()

export const socket: NextWebSocketHandler = (ws, req) => {
  if (!sockets.has(ws)) {
    sockets.add(ws)

    ws.on('close', () => {
      sockets.delete(ws)
    })

    ws.on('message', message => {
      console.log(message.toString())

      ws.send(JSON.stringify(
        {
          position: [
            25,
            250,
            25,
          ],
        },
      ))
    })
  }
}

const handler: NextApiHandler = async (req, res) => {
  res.status(426).send('Upgrade required')
}

export default handler
