export const changeLeftNavState = ({commit}, isShow) => {
  commit('CHANGE_LEFTNAV_STATE', isShow)
}

export const changeUserNameState = ({commit},val) => {
  commit('CHANGE_USER_NAME',val)
}

export const userNameInitState = ({commit}) => {
  commit('USER_NAME_INIT')
}
