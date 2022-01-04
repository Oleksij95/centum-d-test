import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    selectedFilter: ['all']
  },
  mutations: {
    SET_USERS_LIST(state, users){
      state.users = users
    },

    SET_SELECTED_FILTER(state, selectedFilter) {
      state.selectedFilter = selectedFilter
    },

    SET_NEW_USER(state, user) {
      state.users.push(user)
    },

    SET_UPDATED_USER(state, updatedUser){
      let userToUpdate = state.users.findIndex(user => user.id === updatedUser.id);
      state.users[userToUpdate] = updatedUser
    }

  },
  actions: {
    async FETCH_USERS_LIST({commit}){

      await fetch('https://jsonplaceholder.typicode.com/users').then(response => {
        return response.json();
      }).then(data => {
        commit('SET_USERS_LIST', data)
      });

    },

    FETCH_SELECTED_FILTER({commit}, filter) {
      commit('SET_SELECTED_FILTER', filter)
    },

    CREATE_USER({commit}, user){
      commit('SET_NEW_USER', user)
    },

    updateUserVuex({commit}, user){
      commit('SET_UPDATED_USER', user)
    }

  },
  getters: {
    getUsers: s => s.users,
    getSelectedFilter: s => s.selectedFilter
  },
  modules: {
  }
})
