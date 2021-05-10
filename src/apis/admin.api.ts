import { axiosT5 } from '@/axios/axiosTeam5'

/**
 * SubEvent Screen
 */

export const addSubEvent = (
  eventId: string,
  status: string,
  startTime: string,
): Promise<ResAddSubEvent> => {
  return axiosT5
    .post(
      `/event-api/api/v1/Event/` +
        eventId +
        `/subEvent?status=` +
        status +
        `&startTime=` +
        startTime,
    )
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const deleteSubEvent = (subEventId: string): Promise<ResDeleteSubEvent> => {
  return axiosT5
    .delete(`/event-api/api/v1/Event/subEvent/` + subEventId)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

/**
 * Event Admin Screen
 */

export const getAllEvent = (): Promise<Event[]> => {
  return axiosT5
    .get(`/event-api/api/v1/Event`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const searchEventApi = (inputValue: string): Promise<Event[]> => {
  return axiosT5
    .get(`/event-api/api/v1/Event/event/search`, {
      params: {
        keyword: inputValue,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export const createEvent = (
  name: string,
  categoryId: string,
  startTime: string,
  endTime: string,
  image: File,
): Promise<ResCreateEventApi> => {
  let events = {
    name: name,
    categoryId: categoryId,
    startTime: startTime,
    endTime: endTime,
  }
  const formData = new FormData()
  formData.append('events', JSON.stringify(events))
  formData.append('file', image)
  return axiosT5
    .post('/event-api/api/v1/Event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
/**
 * Stream Admin Screen
 */
const streamAdmin = [
  {
    streamID: '1',
    title: 'Pubg with LongTNH',
    status: 'Happening',
    category: 'Game',
    viewersCount: 234,
    createdTime: 2,
  },
  {
    streamID: '2',
    title: 'Pubg with LongTNH',
    status: 'Happening',
    category: 'Game',
    viewersCount: 234,
    createdTime: 2,
  },
]
export const getStreamAdminApi = () => {
  return new Promise(resolve => {
    resolve(streamAdmin)
  })
}

/**
 * User Admin Screen
 */
const userAdmin = [
  {
    userID: '1',
    userName: 'LongTHN',
    email: 'longtnh@gmail.com',
    gender: 'male',
    displayName: 'Long',
    bio: 'baccy',
    followingCount: 234,
    followerCount: 43463,
  },
  {
    userID: '2',
    userName: 'UyenHTN',
    email: 'uyenhtn@gmail.com',
    gender: 'female',
    displayName: 'uyen',
    bio: 'baccy',
    followingCount: 100,
    followerCount: 100,
  },
]
export const getUserAdminApi = () => {
  return new Promise(resolve => {
    resolve(userAdmin)
  })
}
