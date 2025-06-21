import { api, handleApiError } from '../../services/api'

export const getAllSales = async () => {
  try {
    const res = await api.get('/sales')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getSaleBy = async ({ id }) => {
  try {
    const res = await api.get(`/sales/${id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getSalesByProduct = async (search) => {
  const searchParams = new URLSearchParams(search).toString()
  try {
    const res = await api.get(`/sales?${searchParams}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postSale = async (data) => {
  try {
    const token = window.localStorage.getItem('token')
    const res = await api.post('/sales', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const patchSale = async (data) => {
  try {
    const res = await api.patch(`/sales/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const deleteSale = async (data) => {
  try {
    const res = await api.delete(`/sales/${data.id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
