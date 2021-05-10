import { LOGIN_SUCCESS } from '@/pages/Login/login.constants'
import { PROFILE_IMAGE_UPDATE_SUCCESS } from '@/pages/ProfileEdit/profileedit.constants'
import {
  GET_CURRENT_USER_INFO_SUCCESS,
  LOGOUT,
  TOGGLE_SIDEBAR,
  GET_FOLLOWING_STREAM_SESSION_SUCCESS,
  GET_RECOMMEND_STREAM_SESSION_SUCCESS,
  GET_FOLLOWING_USERS_SUCCESS,
  ADD_NEW_NOTIFICATION,
} from './App.constants'

const initialState = {
  isAuthenticated: false,
  isSideBarCollapsed: false,
  currentUser: { sub: '', name: '', profile_image: '' } as CurrentUser,
  followingStreamSession: [] as StreamSession[],
  recommendStreamSession: [] as StreamSession[],
  followingUsers: {},
  notifications: [] as any[],
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      return {
        ...state,
        isSideBarCollapsed: !state.isSideBarCollapsed,
      }
    }
    case PROFILE_IMAGE_UPDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        currentUser: { ...state.currentUser, profile_image: action.payload },
      }
    }
    case GET_CURRENT_USER_INFO_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
      }
    }
    case GET_RECOMMEND_STREAM_SESSION_SUCCESS: {
      return {
        ...state,
        recommendStreamSession: action.payload,
      }
    }
    case GET_FOLLOWING_STREAM_SESSION_SUCCESS: {
      return {
        ...state,
        followingStreamSession: action.payload,
      }
    }
    case GET_FOLLOWING_USERS_SUCCESS: {
      return {
        ...state,
        followingUsers: action.payload,
      }
    }
    case ADD_NEW_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications
          ? [action.payload, ...state.notifications]
          : [action.payload],
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
      }
    }
    case LOGOUT: {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      return {
        ...initialState,
      }
    }
    default: {
      return state
    }
  }
}

export default appReducer
