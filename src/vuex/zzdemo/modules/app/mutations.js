import {
  CHANGE_LEFTNAV_STATE,
  START_LOADING,
  FINISH_LOADING,
  CHANGE_USER_NAME,
  USER_NAME_INIT
} from './mutation-type'

const mutations = {
  [CHANGE_LEFTNAV_STATE] (state, isShow) {
    state.leftNavState = isShow
  },
  [START_LOADING] (state) {
    state.loading = true
  },
  [FINISH_LOADING] (state) {
    state.loading = false
  },
  [CHANGE_USER_NAME] (state,val) {
    state.user_name = val
  },
  [USER_NAME_INIT] (state) {
    state.user_name = ''
  }
}

export default mutations
