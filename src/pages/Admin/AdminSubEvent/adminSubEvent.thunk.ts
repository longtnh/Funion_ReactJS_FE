import { addSubEvent, deleteSubEvent } from '@/apis/admin.api'
import * as actions from './adminSubEvent.action'

export const addSubEventAdmin = (
  eventId: string,
  status: string,
  startTime: string,
) => dispatch => {
  return addSubEvent(eventId, status, startTime).then(res => {
    return dispatch(actions.addSubEventSuccess(res))
  })
}
export const deleteSubEventAdmin = (subEventId: string) => dispatch => {
  return deleteSubEvent(subEventId).then(res => {
    return dispatch(actions.deleteSubEventSuccess(res))
  })
}
