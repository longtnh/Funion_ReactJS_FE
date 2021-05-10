import { idenT5 } from '@/axios/axiosTeam5'

export const getFollowingUsersApi = (targetId: string) => {
  return idenT5
    .get(`/api/user/${targetId}/following`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
