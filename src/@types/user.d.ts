interface ReqLogin {
  email: string
  password: string
}

interface ReqExternalLogin {
  externalToken: string
}

interface ResLoginApi extends Res {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  role: string
}

interface CurrentUser {
  sub: string
  name: string
  profile_image?: string
}

interface User {
  id: string
  userName: string
  email: string
  name: number
  unique_name: string
  gender: string
  profile_image: string
  banner_image: string
  biography: string
  followingCount: number
  followedCount: number
  isFollowing: boolean
}

interface ResProfileUpdateApi extends Res {
  data: {
    DisplayName: string
    Biography: string
    Gender: number
  }
}

interface ResUpdateBannerImageApi extends Res {
  data: {
    Image: File
  }
}
interface ResUpdateProfileImageApi extends Res {
  crop: number
  zoom: number
  data: {
    Image: File
  }
}

interface UserSearch {
  id: string
  name: string
  profileImage: string
  biography: string
  followedCount: number
}

interface ResRegister extends Res {
  data: {
    email: string
    password: string
    confirmPassword: string
    name: string
  }
}
