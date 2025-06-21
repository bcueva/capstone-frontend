import { api, handleApiError, handlePostImage } from '../../services/api'

export const getAllProducts = async () => {
  try {
    const res = await api.get('/products')
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getProductBy = async ({ id }) => {
  try {
    const res = await api.get(`/products/${id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const getProductByCode = async ({ code }) => {
  try {
    const res = await api.get(`/products/byCode/${code}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postProduct = async (data) => {
  try {
    const res = await api.post('/products', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const patchProduct = async (data) => {
  try {
    const res = await api.patch(`/products/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const deleteProduct = async (data) => {
  try {
    const res = await api.delete(`/products/${data.id}`)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}

export const postImage = async (image) => {
  try {
    const res = await handlePostImage('/products/upload-image', image)
    return res.data
  } catch (err) {
    return handleApiError(err)
  }
}
