import { axiosT5 } from '@/axios/axiosTeam5'

export const getCategoriesApi = (
  pageIndex: number,
  pageSize: number = 20,
  searchTagIds: string[] = [],
): Promise<PaginatedResult<Category[]>> => {
  return axiosT5
    .get('/topic-api/api/v1/category/items', {
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        tagIds: searchTagIds.join(','),
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export const getCategoryByIdApi = (
  categoryId: string,
): Promise<PaginatedResult<Category[]>> => {
  return axiosT5
    .get(`/topic-api/api/v1/category/${categoryId}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const searchCategoriesApi = (inputValue: string = ''): Promise<Category[]> => {
  return axiosT5
    .get('/topic-api/api/v1/category/search', {
      params: {
        keyword: inputValue,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

export const getTopCategoriesApi = (): Promise<PaginatedResult<Category[]>> => {
  return axiosT5
    .get('/topic-api/api/v1/category/items', {
      params: {
        pageIndex: 0,
        pageSize: 10,
      },
    })
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}
