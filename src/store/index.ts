import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    isSignIn: false
  },
  getters: {
  },
  mutations: {
    CHANGE_SIGN_IN_STATUS(state) {
      state.isSignIn = !state.isSignIn;
    }
  },
  actions: {
    changeSignInStatus({commit}) {
      commit('CHANGE_SIGN_IN_STATUS');
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
