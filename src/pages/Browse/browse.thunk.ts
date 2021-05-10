import { getCategoriesApi } from '@/apis/category.api'
import { getTagApi } from '@/apis/tag.api'
import * as actions from './browse.actions'

export const getCategoriesData = (
  pageIndex: number,
  pageSize: number,
  searchTagIds: string[] = [],
) => dispatch => {
  dispatch(actions.getCategoriesRequested())
  return getCategoriesApi(pageIndex, pageSize, searchTagIds)
    .then(res => {
      return dispatch(actions.getCategoriesSuccess(res))
    })
    .catch(() => {
      return dispatch(actions.getCategoriesFail())
    })
}

export const getTagData = () => dispatch => {
  return getTagApi().then(res => {
    return dispatch(actions.getTagSuccess(res))
  })
}
