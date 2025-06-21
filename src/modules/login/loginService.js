import { api, handleApiError } from '../../services/api'

export const postLogin = async (data) => {
  try {
    const res = await api.post('/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
