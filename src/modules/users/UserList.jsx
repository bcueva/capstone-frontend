import { useEffect, useState } from 'react'
import {
  deleteUser,
  getAllUsers,
  patchUser,
  postUser,
  postImage
} from './userService'
import Table from '../../components/Table/Table'
import UserForm from './UserForm'
import { columns } from './constants'
import useModal from '../../hooks/useModal'
import Button from '../../components/Button/Button'
import { getAllRoles } from '../roles/roleService'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.status === 'success') {
        setUsers(res.data)
      }
    })
    return () => {}
  }, [])

  useEffect(() => {
    getAllRoles().then((res) => {
      if (res.status === 'success') {
        setRoles(res.data)
      }
    })
    return () => {}
  }, [])

  const createUser = async (user) => {
    if (user.image) {
      const resImg = await postImage(user.image)
      user.image = resImg.data.filePath
    }
    const res = await postUser(user)
    if (res.status === 'success') {
      setUsers((prev) => [...prev, res.data])
    }
    closeModal('createUser')
  }

  const editUser = async (user) => {
    const res = await patchUser(user)
    if (res.status === 'success') {
      setUsers((prev) => prev.map(c => c.id === user.id ? res.data : c))
    }
    console.log(users)

    closeModal('editUser')
  }

  const removeUser = async (user) => {
    const res = await deleteUser({ id: user.id })
    if (res.status === 'success') {
      setUsers((prev) => prev.filter((c) => c.id !== user.id))
    }
  }

  return (
    <>
      <UserForm
        isOpen={isModalOpen('createUser')}
        roles={roles}
        onSubmit={createUser}
        onCancel={() => closeModal('createUser')}
      />
      <UserForm
        isOpen={isModalOpen('editUser')}
        user={selectedUser}
        roles={roles}
        onSubmit={editUser}
        onCancel={() => closeModal('editUser')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px'
        }}
      >
        <h2>Usuarios</h2>
        <Button onClick={() => openModal('createUser')}>
          Nuevo usuario
        </Button>
      </div>
      <Table
        data={users}
        columns={columns}
        fnEdit={(user) => {
          setSelectedUser(user)
          openModal('editUser')
        }}
        fnDelete={removeUser}
      />
    </>
  )
}

UserList.propTypes = {}

export default UserList
