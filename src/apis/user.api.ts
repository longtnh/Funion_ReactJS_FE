import { idenT5 } from '@/axios/axiosTeam5'

const mostPlayGames = [
  {
    name: 'League of Legends',
    image:
      'https://img.redbull.com/images/c_crop,x_326,y_0,h_720,w_576/c_fill,w_860,h_1075/q_auto,f_auto/redbullcom/2020/3/19/ubnd9qmdyajztb6ucg7a/tft-galaxies-header',
  },
  {
    name: 'PUBG Mobile',
    image: 'https://seeklogo.com/images/P/pubg-mobile-logo-28E182F8A8-seeklogo.com.png',
  },
  {
    name: 'League of Legends',
    image:
      'https://i.pinimg.com/736x/30/0e/58/300e58c8416a68dcfcf1761501348243--gaming-logo-game-info.jpg',
  },
]
const fakeUserSearch = [
  {
    id: 1,
    userName: 'ctsvfpt@fpt.edu.vn',
    email: 'ctsvfpt@fpt.edu.vn',
    name: 'Phòng công tác sinh viên ĐH FPT Đà Nẵng',
    unique_name: 'CTSV FPTU DN',
    gender: '',
    profile_image:
      'https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/146011766_4349777171716039_5838373100729881308_n.png?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=wD7MD1BKiuMAX_MkMxR&_nc_ht=scontent.fdad2-1.fna&oh=baeb672632d0f2e54089b3881110d6e4&oe=60909B3D',
    banner_image: '',
    biography: 'Kênh truyền thông của phòng công tác sinh viên trường ĐH FPT Đà Nẵng',
    followingCount: 6403,
    followedCount: 1,
    isFollowing: true,
  },
  {
    id: 2,
    userName: 'fum@fpt.edu.vn',
    email: 'fum@fpt.edu.vn',
    name: 'Câu lạc bộ truyền thông - FUM - FPT University Media',
    unique_name: 'FUM Media ',
    gender: '',
    profile_image:
      'https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-9/142116076_694534417907374_4246740029942659153_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=hrkx7KFlyzAAX8EegZS&_nc_ht=scontent.fdad1-1.fna&oh=e36f67519113f2cad5fb3251380cea2f&oe=6090572B',
    banner_image: '',
    biography:
      'FUM (FPT University Media) là câu lạc bộ truyền thông thuộc trường đại học FPT Đà Nẵng. FUM là sân chơi của những con người đam mê việc làm nội dung, quay phim, chụp hình, thiết kế.',
    followingCount: 3402,
    followedCount: 1,
    isFollowing: true,
  },
]

export const getUserSearch = () => {
  return new Promise(resolve => {
    resolve(fakeUserSearch)
  })
}
export const getInfoByIdApi = (infoId: string): Promise<PaginatedResult<User[]>> => {
  return idenT5
    .get(`/api/user/${infoId}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
export const followUserApi = (targetId: string): Promise<boolean> => {
  return idenT5
    .post('/api/user/follow', { targetId: targetId })
    .then(() => {
      return true
    })
    .catch(error => {
      throw error
    })
}

export const unFollowUserApi = (targetId: string): Promise<boolean> => {
  return idenT5
    .post('/api/user/unfollow', { targetId: targetId })
    .then(() => {
      return true
    })
    .catch(error => {
      throw error
    })
}

export const searchUser = (keyword: string): Promise<UserSearch[]> => {
  return idenT5
    .get('/api/user/search', {
      params: {
        keyword: keyword,
        pageSize: 10,
        pageIndex: 0,
      },
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const getMostPlayGamesApi = () => {
  return new Promise(resolve => {
    resolve(mostPlayGames)
  })
}

export const getCurrentUserInfoApi = (): Promise<User> => {
  return idenT5
    .get('/connect/userinfo')
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const register = (
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
): Promise<ResRegister> => {
  let register = {
    email: email,
    Password: password,
    ConfirmPassword: confirmPassword,
    user: {
      name: name,
    },
  }
  return idenT5
    .post('/api/Account/Register', register)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error.response.data.detail
    })
}
