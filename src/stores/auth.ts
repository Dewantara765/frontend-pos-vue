import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    setUser(user: any) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    }
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
  }
})
