import * as actions from './profileedit.actions'
import { updateAvatarApi, updateBannerApi, updateProfileApi } from '@/apis/profile.api'
import { getCurrentUserInfoApi } from '@/apis/user.api'

// Get profile information
export const getUserProfile = () => dispatch => {
  return getCurrentUserInfoApi().then((res: User) => {
    return dispatch(actions.getProfileSuccess(res))
  })
}

// Update profile information
export const updateUserInfo = (
  displayName: string,
  biography: string,
  gender: number,
) => dispatch => {
  dispatch(actions.profileUpdating())
  return updateProfileApi(displayName, biography, gender)
    .then(res => {
      return dispatch(actions.profileUpdateSuccess())
    })
    .catch(err => {
      return dispatch(actions.profileUpdateFailed(err.message))
    })
}
// Upload banner
export const updateBanner = (Image: File) => dispatch => {
  return updateBannerApi(Image)
    .then(res => {
      return dispatch(actions.bannerImageUpdateSuccess(res))
    })
    .catch(err => {
      return dispatch(actions.profileUpdateFailed(err.message))
    })
}

// Upload avatar
export const updateAvatar = (Image: File) => dispatch => {
  return updateAvatarApi(Image)
    .then(res => {
      return dispatch(actions.profileImageUpdateSuccess(res))
    })
    .catch(err => {
      return dispatch(actions.profileUpdateFailed(err.message))
    })
}
