import { getCategoryByIdApi } from '@/apis/category.api'
import { getStreamSessionsByCategoryApi } from '@/apis/stream.api'
import * as actions from './BrowseItem.actions'

export const getCategory = (categoryId: string) => dispatch => {
  return getCategoryByIdApi(categoryId).then(res => {
    return dispatch(actions.getBrowseItemSuccess(res))
  })
}
export const getStreamSessionsByCategoryData = () => dispatch => {
  return getStreamSessionsByCategoryApi().then(res => {
    return dispatch(actions.getStreamSuccess(res))
  })
}
