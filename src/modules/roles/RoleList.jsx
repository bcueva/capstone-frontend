import Table from '../../components/Table/Table'
import { useEffect, useState } from 'react'
import {
  deleteRole,
  getAllRoles,
  patchRole,
  postRole
} from './roleService'
import { columns } from './constants'
import Button from '../../components/Button/Button'
import useModal from '../../hooks/useModal'
import RoleForm from './RoleForm'
import { getAllPermissions } from '../permissions/permissionService'

const RoleList = () => {
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    getAllRoles().then((res) => {
      if (res.status === 'success') {
        setRoles(res.data)
      }
    })
    return () => {}
  }, [])

  useEffect(() => {
    getAllPermissions().then((res) => {
      if (res.status === 'success') {
        setPermissions(res.data)
      }
    })
    return () => {}
  }, [])

  const createRole = async (role) => {
    const res = await postRole(role)
    if (res.status === 'success') {
      setRoles((prev) => [...prev, res.data])
    }
    closeModal('createRole')
  }

  const editRole = async (role) => {
    const res = await patchRole(role)
    if (res.status === 'success') {
      setRoles((prev) =>
        prev.map((c) => (c.id === role.id ? res.data : c))
      )
    }
    closeModal('editRole')
  }

  const removeRole = async (role) => {
    const res = await deleteRole({ id: role.id })
    if (res.status === 'success') {
      setRoles((prev) =>
        prev.filter((c) => c.id !== role.id)
      )
    }
  }

  return (
    <>
      <RoleForm
        isOpen={isModalOpen('createRole')}
        permissions={permissions}
        onSubmit={createRole}
        onCancel={() => closeModal('createRole')}
      />
      <RoleForm
        isOpen={isModalOpen('editRole')}
        permissions={permissions}
        role={selectedRole}
        onSubmit={editRole}
        onCancel={() => closeModal('editRole')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px'
        }}
      >
        <h2>Roles</h2>
        <Button onClick={() => openModal('createRole')}>
          Nuevo rol
        </Button>
      </div>
      <Table
        data={roles}
        columns={columns}
        fnEdit={(role) => {
          setSelectedRole(role)
          openModal('editRole')
        }}
        fnDelete={removeRole}
      />
    </>
  )
}

RoleList.propTypes = {}

export default RoleList
