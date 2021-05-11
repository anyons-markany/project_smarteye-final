import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState  from 'vuex-persistedstate'
import Cookies from 'js-cookie'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idString: '',
    rank: '',
    role: '',
  },
  getters:{},
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })],
  // plugins: [createPersistedState()],

  mutations: {
   setID(state,payload){
    state.idString = payload
    },
    setRank(state,payload){
      state.rank = payload;
    },
    setRole(state,payload){
      state.role = payload;
    },
  },
  modules: {

  },
  
})
