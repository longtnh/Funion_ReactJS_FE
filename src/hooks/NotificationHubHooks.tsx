/* eslint-disable react-hooks/exhaustive-deps */
import { addNewNotification } from '@/App/App.actions'
import { PATH } from '@/constants/paths'
import { addNewStreamSession } from '@/pages/StreamManager/streammanager.actions'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { NOTIFICATION_HUB_ACTIONS } from '../constants/hookActions'

export const useNotificationHub = () => {
  const dispatch = useDispatch()
  let { url } = useRouteMatch()
  url = url.replace(/\/$/, '')

  useEffect(() => {
    // Config signalR hub connection
    const token = localStorage.getItem('token')
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.API_ENDPOINT}${PATH.NOTIFICATION_HUB}`, {
        accessTokenFactory: () => `${token}`,
      })
      .withAutomaticReconnect()
      .build()

    newConnection
      .start()
      .then(() => {
        newConnection.on(NOTIFICATION_HUB_ACTIONS.NEW_STREAM_CONNECTED, message => {
          dispatch(addNewStreamSession(JSON.parse(message)))
          dispatch(
            addNewNotification({
              thumbnailImageUrl: `${process.env.API_ENDPOINT}/event-api/api/v1/event/items/pic/5926cd2a-be5c-4dab-8ee8-64e4d2c3716f.png`,
              content: 'Has happenasdadsdsaed',
              forwardUrl: `${url}${PATH.STREAM_VIEW}/c9f4b37a-8890-42f4-966d-93113cdd0cc2`,
            }),
          )
        })
        newConnection.on(NOTIFICATION_HUB_ACTIONS.NEW_SUB_EVENT_HAPPENING, message => {
          const event = JSON.parse(message)
          dispatch(
            addNewNotification({
              thumbnailImageUrl: `${process.env.API_ENDPOINT}${event.ThumbnailImageUrl}`,
              content: `${event.EventName} is happening`,
              forwardUrl: `${url}${PATH.STREAM_VIEW}/${event.StreamSessionId}`,
            }),
          )
        })
      })
      .catch(e => e)
    return () => {
      newConnection.stop()
    }
  })

  return {}
}
