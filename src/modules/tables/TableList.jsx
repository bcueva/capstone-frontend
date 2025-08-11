import Table from '../../components/Table/Table'
import { useEffect, useState } from 'react'
import {
  deleteTable,
  getAllTables,
  patchTable,
  postTable
} from './tableService'
import { columns } from './constants'
import Button from '../../components/Button/Button'
import useModal from '../../hooks/useModal'
import TableForm from './TableForm'
import { useLocation } from 'wouter'

const TableList = (props) => {
  const [, setLocation] = useLocation()
  const [tables, setTables] = useState([])
  const [selectedTable, setSelectedTable] = useState(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    getAllTables().then((res) => {
      if (res.status === 'success') {
        setTables(res.data)
      }
    })
    return () => {}
  }, [])

  const createTable = async (table) => {
    const res = await postTable(table)
    if (res.status === 'success') {
      setTables((prev) => [...prev, res.data])
    }
    closeModal('createTable')
  }

  const editTable = async (table) => {
    const res = await patchTable(table)
    if (res.status === 'success') {
      setTables((prev) =>
        prev.map((c) => (c.id === table.id ? res.data : c))
      )
    }
    closeModal('editTable')
  }

  const removeTable = async (table) => {
    const res = await deleteTable({ id: table.id })
    if (res.status === 'success') {
      setTables((prev) =>
        prev.filter((c) => c.id !== table.id)
      )
    }
  }

  return (
    <>
      <TableForm
        isOpen={isModalOpen('createTable')}
        onSubmit={createTable}
        onCancel={() => closeModal('createTable')}
      />
      <TableForm
        isOpen={isModalOpen('editTable')}
        table={selectedTable}
        onSubmit={editTable}
        onCancel={() => closeModal('editTable')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px'
        }}
      >
        <h2>Mesas</h2>
        <Button onClick={() => openModal('createTable')}>
          Nueva mesa
        </Button>
      </div>
      <Table
        data={tables}
        columns={columns}
        fnEdit={(table) => {
          setSelectedTable(table)
          openModal('editTable')
        }}
        fnDelete={removeTable}
        fnActions={[
          {
            show: 'is_available',
            label: 'Ver pedido',
            function: (row) => {
              setLocation(`/pos/${row.sale_id}`)
            }
          }
        ]}
      />
    </>
  )
}

TableList.propTypes = {}

export default TableList
