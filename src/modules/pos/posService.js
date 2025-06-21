import { api, handleApiError } from '../../services/api'

export const getSuggestionsProducts = async ({ query }) => {
  try {
    const res = await api.get(`/products/suggestions?search=${query}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
