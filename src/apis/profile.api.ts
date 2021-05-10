import { idenT5 } from '@/axios/axiosTeam5'

export const updateProfileApi = (
  displayName: string,
  biography: string,
  gender: number,
): Promise<ResProfileUpdateApi> => {
  return idenT5
    .post('/api/user/update-info', {
      DisplayName: displayName,
      Biography: biography,
      Gender: gender,
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
// Update banner
export const updateBannerApi = (Image: File): Promise<ResUpdateBannerImageApi> => {
  const formData = new FormData()
  formData.append('Image', Image)
  return idenT5
    .post('/api/user/banner-image/', formData, {
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

// Update avatar
export const updateAvatarApi = (
  Image: File,
  // crop: number,
  // zoom: number,
): Promise<ResUpdateBannerImageApi> => {
  const formData = new FormData()
  formData.append('Image', Image)
  return idenT5
    .post('/api/user/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // params: {
      //   crop: crop,
      //   zoom: zoom,
      // },
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
