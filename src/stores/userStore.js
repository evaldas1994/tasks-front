// import { defineStore } from 'pinia'
//
// export const useUserStore = defineStore('user', {
//   state: () => ({
//     user: null,
//     token: null
//   }),
//   actions: {
//     setUser(user) { this.user = user },
//     setToken(token) { this.token = token }
//   }
// })

import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
    setToken(token) {
      this.token = token
    }
  },
  persist: true // <-- įjungiam persist
})
