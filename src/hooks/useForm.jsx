import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const useForm = (defaultValues) => {
  const [form, setForm] = useState(defaultValues || {})

  useEffect(() => {
    setForm(defaultValues || {})
  }, [defaultValues])

  const handleChange = (evt) => {
    const { name, value, type, checked, selectedIndex, files } = evt.target
    const valueMap = {
      checkbox: checked,
      select: selectedIndex,
      file: files?.[0]
    }

    const updatedValue = valueMap[type] !== undefined ? valueMap[type] : value

    setForm((prevForm) => {
      const [prefix, key] = name.split('.')
      if (key) {
        return {
          ...prevForm,
          [prefix]: {
            ...prevForm[prefix],
            [key]: updatedValue
          }
        }
      }
      return { ...prevForm, [name]: updatedValue }
    })
  }

  const updateForm = (newForm) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        ...newForm
      }
    })
  }

  const handleSubmit = (onSubmit) => (evt) => {
    evt.preventDefault()
    onSubmit(form)
    setForm({})
  }

  return { form, handleChange, updateForm, handleSubmit }
}

useForm.propTypes = {
  defaultValues: PropTypes.object.isRequired
}

export default useForm
