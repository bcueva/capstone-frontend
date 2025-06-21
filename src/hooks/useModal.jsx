import { useState } from 'react'
// import PropTypes from 'prop-types'

const useModal = () => {
  const [modals, setModals] = useState({})

  const openModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }))
  }

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }))
  }

  const isModalOpen = (modalName) => !!modals[modalName]

  return { isModalOpen, openModal, closeModal }
}

useModal.propTypes = {}

export default useModal
