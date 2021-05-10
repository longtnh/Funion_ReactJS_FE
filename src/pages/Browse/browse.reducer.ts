import * as actions from './browse.constants'

const initialState = {
  pageIndex: 0,
  pageSize: 50,
  searchTagIds: [],
  isFetching: false,
  categories: [] as Category[],
  tags: [] as Tag[],
}

const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_CATEGORIES_REQUESTED: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case actions.UPDATE_SEARCH_TAG_IDS: {
      return {
        ...state,
        searchTagIds: action.payload,
      }
    }
    case actions.LOAD_CATEGORIES_SUCCESS: {
      return {
        ...state,
        pageIndex: action.payload.pageIndex,
        pageSize: action.payload.pageSize,
        isFetching: false,
        categories:
          action.payload.pageIndex === 0
            ? action.payload.data
            : [...state.categories, ...action.payload.data],
      }
    }
    case actions.LOAD_CATEGORIES_FAIL: {
      return {
        ...state,
        isFetching: false,
        categories: [],
      }
    }
    case actions.LOAD_TAG_SUCCESS: {
      return {
        ...state,
        tags: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default browseReducer
