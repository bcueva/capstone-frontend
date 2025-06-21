import { api, handleApiError } from '../../services/api'

export const getAllRoles = async () => {
  try {
    const res = await api.get('/roles')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getRoleBy = async ({ id }) => {
  try {
    const res = await api.get(`/roles/${id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postRole = async (data) => {
  try {
    const res = await api.post('/roles', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const patchRole = async (data) => {
  try {
    const res = await api.patch(`/roles/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const deleteRole = async (data) => {
  try {
    const res = await api.delete(`/roles/${data.id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
