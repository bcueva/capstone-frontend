// src/stores/useAuthStore.js
import { create } from 'zustand'
import { postLogin } from '../modules/login/loginService'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = create((set) => ({
  token: window.localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: false,
  error: null,

  login: async ({ email, password }) => {
    const { status, data, message } = await postLogin({ email, password })
    if (status !== 'success') {
      set({ error: 'Usuario y/o contraseña incorrectos' })
      throw new Error(message || 'Login fallido')
    }

    const { token } = data
    const user = jwtDecode(token)
    window.localStorage.setItem('token', token)

    const auth = {
      token,
      user,
      isAuthenticated: true
    }

    set(auth)
    return auth
  },

  logout: () => {
    window.localStorage.removeItem('token')
    set({
      token: null,
      user: null,
      isAuthenticated: false
    })
  },

  checkAuth: () => {
    const token = window.localStorage.getItem('token')
    if (!token) return

    const user = jwtDecode(token)

    const auth = {
      token,
      user,
      isAuthenticated: true
    }

    set(auth)
    return auth
  }
}))
