import { api, handleApiError } from '../../services/api'

export const getAllCompanies = async () => {
  try {
    const res = await api.get('/companies')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getCompanyBy = async ({ id }) => {
  try {
    const res = await api.get(`/companies/${id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getCompaniesByProduct = async (search) => {
  const searchParams = new URLSearchParams(search).toString()
  try {
    const res = await api.get(`/companies?${searchParams}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postCompany = async (data) => {
  try {
    const res = await api.post('/companies', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const patchCompany = async (data) => {
  try {
    const res = await api.patch(`/companies/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const deleteCompany = async (data) => {
  try {
    const res = await api.delete(`/companies/${data.id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
