import { useEffect, useState } from 'react'
import {
  deleteProduct,
  getAllProducts,
  patchProduct,
  postProduct,
  postImage
} from './productService'
import Table from '../../components/Table/Table'
import ProductForm from './ProductForm'
import { columns } from './constants'
import useModal from '../../hooks/useModal'
import Button from '../../components/Button/Button'
// import { getAllItemTypes } from '../itemTypes/itemTypeService'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [itemTypes, setItemTypes] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    getAllProducts().then((res) => {
      if (res.status === 'success') {
        setProducts(res.data)
      }
    })
    return () => {}
  }, [])

  // useEffect(() => {
  //   getAllItemTypes().then((res) => {
  //     if (res.status === 'success') {
  //       setItemTypes(res.data)
  //     }
  //   })
  //   return () => {}
  // }, [])

  const createProduct = async (product) => {
    if (product.image) {
      const resImg = await postImage(product.image)
      product.image = resImg.data.filePath
    }
    const res = await postProduct(product)
    if (res.status === 'success') {
      setProducts((prev) => [...prev, res.data])
    }
    closeModal('createProduct')
  }

  const editProduct = async (product) => {
    const res = await patchProduct(product)
    if (res.status === 'success') {
      setProducts((prev) => prev.map(c => c.id === product.id ? res.data : c))
    }
    closeModal('editProduct')
  }

  const removeProduct = async (product) => {
    const res = await deleteProduct({ id: product.id })
    if (res.status === 'success') {
      setProducts((prev) => prev.filter((c) => c.id !== product.id))
    }
  }

  return (
    <>
      <ProductForm
        isOpen={isModalOpen('createProduct')}
        itemTypes={itemTypes}
        onSubmit={createProduct}
        onCancel={() => closeModal('createProduct')}
      />
      <ProductForm
        isOpen={isModalOpen('editProduct')}
        product={selectedProduct}
        itemTypes={itemTypes}
        onSubmit={editProduct}
        onCancel={() => closeModal('editProduct')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px'
        }}
      >
        <h2>Productos</h2>
        <Button onClick={() => openModal('createProduct')}>
          Nuevo producto
        </Button>
      </div>
      <Table
        data={products}
        columns={columns}
        fnEdit={(product) => {
          setSelectedProduct(product)
          openModal('editProduct')
        }}
        fnDelete={removeProduct}
      />
    </>
  )
}

ProductList.propTypes = {}

export default ProductList
