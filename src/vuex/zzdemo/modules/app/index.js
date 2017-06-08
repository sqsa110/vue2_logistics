import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  leftNavState : false,
  loading : false,
  user_name : ''
}

export default {
  state,
  actions,
  getters,
  mutations
}
