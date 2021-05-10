import { getAllEvent, searchEventApi, createEvent } from '@/apis/admin.api'
import * as actions from './adminEvent.action'

export const getEventAdmin = () => dispatch => {
  return getAllEvent().then(res => {
    return dispatch(actions.getEventSuccess(res))
  })
}
export const getEventSearchData = keyword => dispatch => {
  return searchEventApi(keyword).then(res => {
    return dispatch(actions.getEventSearchSuccess(res))
  })
}
export const createEventAdmin = (
  name: string,
  categoryId: string,
  startTime: string,
  endTime: string,
  image: File,
) => dispatch => {
  return createEvent(name, categoryId, startTime, endTime, image).then(res => {
    return dispatch(actions.createEventSuccess(res))
  })
}
