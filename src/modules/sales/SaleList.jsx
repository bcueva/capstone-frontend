import Table from '../../components/Table/Table'
import { useEffect, useState } from 'react'
import {
  deleteSale,
  getAllSales,
  patchSale,
  postSale
} from './saleService'
import { columns } from './constants'
import Button from '../../components/Button/Button'
import useModal from '../../hooks/useModal'
import SaleForm from './SaleForm'

const SaleList = (props) => {
  const [sales, setSales] = useState([])
  const [selectedSale, setSelectedSale] = useState(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    getAllSales().then((res) => {
      if (res.status === 'success') {
        setSales(res.data)
      }
    })
    return () => {}
  }, [])

  const createSale = async (sale) => {
    const res = await postSale(sale)
    if (res.status === 'success') {
      setSales((prev) => [...prev, res.data])
    }
    closeModal('createSale')
  }

  const editSale = async (sale) => {
    const res = await patchSale(sale)
    if (res.status === 'success') {
      setSales((prev) =>
        prev.map((c) => (c.id === sale.id ? res.data : c))
      )
    }
    closeModal('editSale')
  }

  const removeSale = async (sale) => {
    const res = await deleteSale({ id: sale.id })
    if (res.status === 'success') {
      setSales((prev) =>
        prev.filter((c) => c.id !== sale.id)
      )
    }
  }

  return (
    <>
      <SaleForm
        isOpen={isModalOpen('createSale')}
        onSubmit={createSale}
        onCancel={() => closeModal('createSale')}
      />
      <SaleForm
        isOpen={isModalOpen('editSale')}
        sale={selectedSale}
        onSubmit={editSale}
        onCancel={() => closeModal('editSale')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px'
        }}
      >
        <h2>Ventas</h2>
        {/* <Button onClick={() => openModal('createSale')}>
          Nueva venta
        </Button> */}
      </div>
      <Table
        data={sales}
        columns={columns}
        fnEdit={(sale) => {
          setSelectedSale(sale)
          openModal('editSale')
        }}
        fnDelete={removeSale}
      />
    </>
  )
}

SaleList.propTypes = {}

export default SaleList
