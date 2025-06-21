import { api, handleApiError } from '../../services/api'

export const getMonthlySales = async () => {
  try {
    const res = await api.get('/dashboard/getMonthlySales')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getCumulativeSales = async () => {
  try {
    const res = await api.get('/dashboard/getCumulativeSales')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getDistributionProducts = async () => {
  try {
    const res = await api.get('/dashboard/getDistributionProducts')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
