import * as actions from './adminUser.constants'

const initialState = {
  users: [
    {
      userID: '',
      userName: '',
      email: '',
      gender: '',
      displayName: '',
      bio: '',
      followingCount: '',
      followerCount: '',
    },
  ],
  pagingInfo: {
    from: 0,
    to: 0,
    active: 1,
    total: 0,
    pageSize: 0,
  },
  message: '',
  isBan: true,
}

const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_USER_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      }
    }
    case actions.BAN_BUTTON: {
      return {
        ...state,
        isBan: !state.isBan,
      }
    }
    default: {
      return state
    }
  }
}

export default adminUserReducer
