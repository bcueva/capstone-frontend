import { api, handleApiError } from '../../services/api'

export const getAllPermissions = async () => {
  try {
    const res = await api.get('/permissions')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getPermissionBy = async ({ id }) => {
  try {
    const res = await api.get(`/permissions/${id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getPermissionsByProduct = async (search) => {
  const searchParams = new URLSearchParams(search).toString()
  try {
    const res = await api.get(`/permissions?${searchParams}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postPermission = async (data) => {
  try {
    const res = await api.post('/permissions', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const patchPermission = async (data) => {
  try {
    const res = await api.patch(`/permissions/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const deletePermission = async (data) => {
  try {
    const res = await api.delete(`/permissions/${data.id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
