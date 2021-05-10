import { axiosT5 } from '@/axios/axiosTeam5'

export const getScheduleApi = (
  date: string,
  type: string,
  categoryId: string,
): Promise<Schedule[]> => {
  return axiosT5
    .get(`/event-api/api/v1/Event/schedule/${date}`, {
      params: {
        type: type,
        pageSize: 7,
        categoryId: categoryId,
      },
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const searchEventStreamManager = (inputValue: string = ''): Promise<Event[]> => {
  return axiosT5
    .get('/event-api/api/v1/Event/event/search/closestSubEvent', {
      params: {
        keyword: inputValue,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export const followSubEvent = (subEventId: string): Promise<ResFollowSubEvent> => {
  return axiosT5
    .post('/event-api/api/v1/Event/subEvent/' + subEventId + '/Follow')
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const unFollowSubEvent = (subEventId: string): Promise<ResFollowSubEvent> => {
  return axiosT5
    .delete('/event-api/api/v1/Event/subEvent/' + subEventId + '/UnFollow')
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
