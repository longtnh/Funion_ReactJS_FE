import { getTopCategoriesApi } from '@/apis/category.api'
import { getScheduleApi, followSubEvent, unFollowSubEvent } from '@/apis/event.api'
import * as actions from './event.actions'

export const getTopCategoriesData = () => dispatch => {
  return getTopCategoriesApi().then((res: PaginatedResult<Category[]>) => {
    return dispatch(actions.getTopCategoriesSuccess(res.data))
  })
}

export const getSchedule = (date = '', type = '', categoryId = '') => dispatch => {
  return getScheduleApi(date, type, categoryId).then(res => {
    let followingMaps = {}
    res.forEach(d =>
      d.subEventInDate.forEach(s => (followingMaps[s.scheduleId] = s.isFollowing)),
    )
    return dispatch(actions.getEventsSuccess(res, followingMaps))
  })
}
export const followEvent = (subEventId: string) => dispatch => {
  return followSubEvent(subEventId).then(res => {
    return dispatch(actions.followEventSuccess(subEventId))
  })
}
export const unFollowEvent = (subEventId: string) => dispatch => {
  return unFollowSubEvent(subEventId).then(res => {
    return dispatch(actions.unFollowEventSuccess(subEventId))
  })
}
