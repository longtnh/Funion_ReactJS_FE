import * as actions from './BrowseItem.constants'

const initialState = {
  categoryItem: {} as Category,
  streams: [] as StreamSession[],
}

const browseItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_BROWSE_ITEM_SUCCESS: {
      return {
        ...state,
        categoryItem: action.payload,
      }
    }
    case actions.LOAD_CATEGORY_STREAM_SUCCESS: {
      return {
        ...state,
        streams: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
export default browseItemReducer
