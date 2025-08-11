import { api, handleApiError } from '../../services/api'

export const getAllTables = async () => {
  try {
    const res = await api.get('/tables')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getAvailableTables = async () => {
  try {
    const res = await api.get('/tables/availables')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getTableBy = async ({ id }) => {
  try {
    const res = await api.get(`/tables/${id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getTablesByProduct = async (search) => {
  const searchParams = new URLSearchParams(search).toString()
  try {
    const res = await api.get(`/tables?${searchParams}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postTable = async (data) => {
  try {
    const res = await api.post('/tables', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const patchTable = async (data) => {
  try {
    const res = await api.patch(`/tables/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const deleteTable = async (data) => {
  try {
    const res = await api.delete(`/tables/${data.id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
