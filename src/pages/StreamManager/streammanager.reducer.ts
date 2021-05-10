import { UseToastOptions } from '@chakra-ui/react'
import {
  TOAST_STREAM_FINISHED,
  TOAST_STREAM_PUBLISHED,
  TOAST_STREAM_PUBLISH_FAIL,
} from './components/ToastMessages/ToastMessages'
import * as actions from './streammanager.constants'

const initialState = {
  categories: [] as Category[],
  tags: [] as Tag[],
  streamConfig: null as StreamConfig | null,
  streamSession: null as StreamSession | null,
  categoryItem: null as Category | null,
  isStreaming: false,
  isPublishing: false,
  isLoading: false,
  pushNotifications: [] as UseToastOptions[],
}

const streamManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_TAG_SUCCESS: {
      return {
        ...state,
        tags: action.payload,
      }
    }
    case actions.LOAD_STREAM_CONFIG_SUCCESS: {
      return {
        ...state,
        streamConfig: action.payload,
      }
    }
    case actions.LOAD_STREAM_MEDIA_SOURCE_SUCCESS: {
      return {
        ...state,
        streamSession: action.payload,
      }
    }
    case actions.ADD_NEW_STREAM_SESSION: {
      return {
        ...state,
        isStreaming: true,
        streamSession: action.payload,
      }
    }
    case actions.LOAD_CATEGORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        categoryItem: action.payload,
      }
    }
    case actions.PUBLISH_STREAM_SESSION_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actions.PUBLISH_STREAM_SESSION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isStreaming: true,
        isPublishing: true,
        formValues: action.payload,
        pushNotifications: [...state.pushNotifications, TOAST_STREAM_PUBLISHED],
      }
    }
    case actions.PUBLISH_STREAM_SESSION_FAIL: {
      return {
        ...state,
        isLoading: false,
        pushNotifications: [...state.pushNotifications, TOAST_STREAM_PUBLISH_FAIL],
      }
    }
    case actions.FINISH_STREAM_SESSION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isPublishing: false,
        isStreaming: false,
        categoryItem: null,
        pushNotifications: [...state.pushNotifications, TOAST_STREAM_FINISHED],
      }
    }
    case actions.CLEAR_PUSH_NOTIFICATIONS: {
      return {
        ...state,
        pushNotifications: [],
      }
    }
    default: {
      return state
    }
  }
}

export default streamManagerReducer
