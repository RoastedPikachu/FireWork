import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

interface Notif {
  id: number,
  text: string,
}

export default createStore({
  state: {
    isSignIn: false,
    notifications: [] as Notif[],
    targetId: 0
  },
  getters: {
  },
  mutations: {
    CHANGE_SIGN_IN_STATUS(state) {
      state.isSignIn = !state.isSignIn;
    },
    ADD_NOTIF(state, payload) {
      state.targetId = payload.to_user;
      state.notifications.push(payload);
      console.log(state.targetId);
      console.log(state.notifications);
    },
    DELETE_NOTIF(state) {
      state.notifications = [];
    }
  },
  actions: {
    changeSignInStatus({commit}) {
      commit('CHANGE_SIGN_IN_STATUS');
    },
    addNotif({commit}, payload) {
      commit('ADD_NOTIF', payload);
    },
    deleteNotif({commit}) {
      commit('DELETE_NOTIF');
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
