import axios from 'axios'

const URL_BACKEND = '/api/v1'
export const URL_BACKEND_IMG = '/uploads'

export const api = axios.create({
  baseURL: URL_BACKEND
})

export const handleApiError = (err) => {
  if (err.response) {
    const { status, data } = err.response
    console.error(`Error ${status}: ${data.message}`)
    return {
      success: false,
      message: data.message || 'An unexpected error occurred'
    }
  } else if (err.request) {
    console.error('No response received from API')
    return {
      success: false,
      message: 'No response from server. Please try again later.'
    }
  } else {
    console.error('Error in API request setup:', err.message)
    return {
      success: false,
      message: err.message
    }
  }
}

export const handlePostImage = async (path, image) => {
  const formData = new FormData()
  formData.append('image', image)
  return await api.postForm(path, formData)
}
