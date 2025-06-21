import Table from '../../components/Table/Table'
import { useEffect, useState } from 'react'
import {
  deletePermission,
  getAllPermissions,
  patchPermission,
  postPermission
} from './permissionService'
import { columns } from './constants'
import Button from '../../components/Button/Button'
import useModal from '../../hooks/useModal'
import PermissionForm from './PermissionForm'

const PermissionList = (props) => {
  const [permissions, setPermissions] = useState([])
  const [selectedPermission, setSelectedPermission] = useState(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    getAllPermissions().then((res) => {
      if (res.status === 'success') {
        setPermissions(res.data)
      }
    })
    return () => {}
  }, [])

  const createPermission = async (permission) => {
    const res = await postPermission(permission)
    if (res.status === 'success') {
      setPermissions((prev) => [...prev, res.data])
    }
    closeModal('createPermission')
  }

  const editPermission = async (permission) => {
    const res = await patchPermission(permission)
    if (res.status === 'success') {
      setPermissions((prev) =>
        prev.map((c) => (c.id === permission.id ? res.data : c))
      )
    }
    closeModal('editPermission')
  }

  const removePermission = async (permission) => {
    const res = await deletePermission({ id: permission.id })
    if (res.status === 'success') {
      setPermissions((prev) =>
        prev.filter((c) => c.id !== permission.id)
      )
    }
  }

  return (
    <>
      <PermissionForm
        isOpen={isModalOpen('createPermission')}
        onSubmit={createPermission}
        onCancel={() => closeModal('createPermission')}
      />
      <PermissionForm
        isOpen={isModalOpen('editPermission')}
        permission={selectedPermission}
        onSubmit={editPermission}
        onCancel={() => closeModal('editPermission')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px'
        }}
      >
        <h2>Permisos</h2>
        <Button onClick={() => openModal('createPermission')}>
          Nuevo permiso
        </Button>
      </div>
      <Table
        data={permissions}
        columns={columns}
        fnEdit={(permission) => {
          setSelectedPermission(permission)
          openModal('editPermission')
        }}
        fnDelete={removePermission}
      />
    </>
  )
}

PermissionList.propTypes = {}

export default PermissionList
