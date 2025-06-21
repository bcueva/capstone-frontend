import { api, handleApiError, handlePostImage } from '../../services/api'

export const getAllUsers = async () => {
  try {
    const res = await api.get('/users')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getUserBy = async ({ id }) => {
  try {
    const res = await api.get(`/users/${id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postUser = async (data) => {
  try {
    const res = await api.post('/users', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const patchUser = async (data) => {
  try {
    const res = await api.patch(`/users/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const deleteUser = async (data) => {
  try {
    const res = await api.delete(`/users/${data.id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postImage = async (image) => {
  try {
    const res = await handlePostImage('/users/upload-image', image)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
