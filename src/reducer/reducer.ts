import { combineReducers } from 'redux'
import appReducer from '@/App/App.reducer'
import loginReducer from '@/pages/Login/login.reducer'
import registerReducer from '@/pages/Register/register.reducer'
import profileEditReducer from '@/pages/ProfileEdit/profileedit.reducer'
import browseReducer from '@/pages/Browse/browse.reducer'
import homeReducer from '@/pages/Home/home.reducer'
import followingReducer from '@/pages/Following/following.reducer'
import streamViewReducer from '@/pages/StreamView/streamView.reducer'
import streamManagerReducer from '@/pages/StreamManager/streammanager.reducer'
import PaymentReducer from '@/pages/Payment/payment.reducer'
import EventReducer from '@/pages/Event/event.reducer'
import ProfileViewReducer from '@/pages/ProfileView/profileView.reducer'
import BrowseItemReducer from '@/pages/BrowseItem/BrowseItem.reducer'
import adminEventReducer from '@/pages/Admin/AdminEvent/adminEvent.reducer'
import adminUserReducer from '@/pages/Admin/AdminUser/adminUser.reducer'
import adminStreamReducer from '@/pages/Admin/AdminStream/adminStream.reducer'
import adminSubEventReducer from '@/pages/Admin/AdminSubEvent/adminSubEvent.reducer'
import searchReducer from '@/pages/Search/search.reducer'

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  register: registerReducer,
  profileEdit: profileEditReducer,
  browse: browseReducer,
  home: homeReducer,
  following: followingReducer,
  streamView: streamViewReducer,
  streamManager: streamManagerReducer,
  payment: PaymentReducer,
  event: EventReducer,
  profileView: ProfileViewReducer,
  browseItem: BrowseItemReducer,
  adminEvent: adminEventReducer,
  adminUser: adminUserReducer,
  adminStream: adminStreamReducer,
  adminSubEvent: adminSubEventReducer,
  search: searchReducer,
})

export default rootReducer
