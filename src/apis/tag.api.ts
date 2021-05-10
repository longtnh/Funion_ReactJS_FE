import { axiosT5 } from '@/axios/axiosTeam5'

export const getTagApi = (): Promise<Tag[]> => {
  return axiosT5
    .get('/topic-api/api/v1/tag/items')
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export const searchTagsApi = (inputValue: string = ''): Promise<Tag[]> => {
  return axiosT5
    .get('/topic-api/api/v1/tag/search', {
      params: {
        keyword: inputValue,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}
