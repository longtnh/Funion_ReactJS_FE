/* eslint-disable react-hooks/exhaustive-deps */
import { ChatMessage } from '@/@types/chat'
import { PATH } from '@/constants/paths'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { useEffect, useState } from 'react'
import { STREAM_HUB_ACTIONS } from '../constants/hookActions'

export const useStreamHub = sessionId => {
  // let connection
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const [chatMessages, setMessages] = useState<ChatMessage[]>([])
  const [viewCount, setViewCount] = useState<number>(0)

  useEffect(() => {
    if (sessionId !== undefined && sessionId !== '') {
      // Config signalR hub connection
      const token = localStorage.getItem('token')
      const newConnection = new HubConnectionBuilder()
        .withUrl(
          `${process.env.API_ENDPOINT}${PATH.STREAM_HUB}?streamSessionId=${sessionId}`,
          {
            accessTokenFactory: () => `${token}`,
          },
        )
        .withAutomaticReconnect()
        .build()
      setConnection(newConnection)
    }
  }, [sessionId])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on(STREAM_HUB_ACTIONS.UPDATE_COUNTER, payload =>
            setViewCount(payload),
          )
          connection.on(STREAM_HUB_ACTIONS.SELF_UPDATE_COUNTER, payload =>
            setViewCount(payload),
          )
          connection.on(STREAM_HUB_ACTIONS.SEND_MESSAGE, (message: ChatMessage) =>
            setMessages(messages => [...messages, message]),
          )
          connection.on(STREAM_HUB_ACTIONS.SEND_DONATE, (message: ChatMessage) =>
            setMessages(messages => [...messages, message]),
          )

          // Invoke self update counter
          connection?.invoke(STREAM_HUB_ACTIONS.SELF_UPDATE_COUNTER).catch(err => err)
        })
        .catch(e => e)
    }
    return () => {
      connection?.stop()
    }
  }, [connection])

  const sendChatMessage = async (message: ChatMessage) => {
    if (connection)
      await connection.invoke(STREAM_HUB_ACTIONS.SEND_MESSAGE, message).catch(e => e)
  }

  return { chatMessages, viewCount, sendChatMessage }
}
