import * as actions from './profileView.constants'

const initialState = {
  profile: {} as User,
  mostPlayGames: [{} as Game],
  isFollowing: true,
}

const introduceInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_INFO_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        isFollowing: action.payload.isFollowing,
      }
    }
    case actions.LOAD_MOST_PLAY_GAMES_SUCCESS: {
      return {
        ...state,
        mostPlayGames: action.payload,
      }
    }
    case actions.FOLLOW_SUCCESS: {
      let newProfile = state.profile
      newProfile.followedCount++
      return {
        ...state,
        isFollowing: true,
        profile: newProfile,
      }
    }
    case actions.UN_FOLLOW_SUCCESS: {
      let newProfile = state.profile
      newProfile.followedCount--
      return {
        ...state,
        isFollowing: false,
        profile: newProfile,
      }
    }
    default: {
      return state
    }
  }
}

export default introduceInfoReducer
