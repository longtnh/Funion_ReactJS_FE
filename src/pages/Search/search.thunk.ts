import { searchStreamSession } from '@/apis/stream.api'
import { searchUser } from '@/apis/user.api'
import { searchCategoriesApi } from '@/apis/category.api'
import * as actions from './search.action'

export const getStreamSessionsSearchData = (keyword: string) => dispatch => {
  return searchStreamSession(keyword).then(res => {
    return dispatch(actions.getStreamSearchSuccess(res))
  })
}

export const getUserSearchData = (keyword: string) => dispatch => {
  return searchUser(keyword).then(res => {
    return dispatch(actions.getUserSearchSuccess(res))
  })
}

export const getCategorySearchData = (keyword: string) => dispatch => {
  return searchCategoriesApi(keyword).then(res => {
    return dispatch(actions.getCategorySearchSuccess(res))
  })
}
