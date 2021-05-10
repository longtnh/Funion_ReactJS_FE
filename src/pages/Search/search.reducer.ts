import * as actions from './search.constants'

const initialState = {
  streamSessions: [] as StreamSession[],
  user: [] as User[],
  category: [] as Category[],
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_STREAM_SEARCH_SUCCESS: {
      return {
        ...state,
        streamSessions: action.payload,
      }
    }
    case actions.LOAD_USER_SEARCH_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      }
    }
    case actions.LOAD_CATEGORIES_SEARCH_SUCCESS: {
      return {
        ...state,
        category: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default searchReducer
