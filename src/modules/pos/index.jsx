import useForm from '../../hooks/useForm'
import styles from './Pos.module.css'
import { useState } from 'react'
// import { getProductForSale } from '../../services/product'
import { toast, Toaster } from 'sonner'
import { postSale } from '../sales/saleService'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Table from '../../components/Table/Table'
import { getProductByCode } from '../products/productService'
import Search from '../../components/Search/Search'
import { getSuggestionsProducts } from './posService'

const columnProperties = [
  { text: 'Código', property: 'code' },
  { text: 'Producto', property: 'name' },
  { text: 'Cantidad', property: 'quantity' },
  { text: 'Precio', property: 'price' },
  { text: 'Total', property: 'total' }
]

const POSPage = () => {
  const { form, handleChange } = useForm()
  const { form: formProduct, handleChange: handleChangeProduct } = useForm()

  const [amounts, setAmounts] = useState({
    total: '0',
    igv: '0',
    subtotal: '0'
  })

  const [products, setProducts] = useState([])

  const calculateAmounts = (products) => {
    let total = products.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    )
    total = parseFloat(total.toFixed(2))
    const subtotal = parseFloat((total * 0.82).toFixed(2))
    const igv = parseFloat((subtotal * 0.18).toFixed(2))
    setAmounts({ total, igv, subtotal })
  }

  const handleChangeProduct2 = async (evt) => {
    evt.preventDefault()
    const text = formProduct.productCode.trim()
    if (!text) return

    try {
      const res = await getProductByCode({ code: text })
      if (!res.data) {
        toast.error('No se encuentra el producto')
        return
      }

      const { price } = res.data

      // if (stockDisponible < 1) {
      //   toast.error('No hay stock disponible')
      //   return
      // }

      const product = {
        ...res.data,
        quantity: formProduct.productQuantity,
        total: price * formProduct.productQuantity
      }

      updateProducts([...products, product])
    } catch (e) {
      toast.error('No se encuentra un producto con ese código')
    }
  }

  const handleDeleteProduct = (deletedProduct) => {
    const newProducts = products.filter(
      (p) => p.codigoEan13 !== deletedProduct.codigoEan13
    )
    updateProducts(newProducts)
    toast.warning('Se ha eliminado el producto')
  }

  const updateProducts = (newProducts) => {
    setProducts(newProducts)
    calculateAmounts(newProducts)
  }

  const sendSale = async () => {
    const details = products.map(({ id, quantity, price }) => ({
      id,
      quantity,
      price
    }))
    const sale = {
      companyRuc: form.companyRuc,
      details
    }

    try {
      const res = await postSale(sale)
      if (res.status === 'success') {
        toast.success('Venta registrada con exito')
        clearSale()
      } else {
        toast.error('No se pudo registrar la venta')
      }
    } catch {
      toast.error('No se grabó la venta')
    }
  }

  const clearSale = () => {
    // resetForm()
    setProducts([])
    calculateAmounts([])
    // inputProductRef.current.focus()
  }

  return (
    <>
      <Toaster richColors position='top-center' />
      <div className={styles['main-container']}>
        <div className={styles['left-section']}>
          <div className={styles.card}>
            <div className={styles['card-header']}>Detalle</div>
            <div className={styles['card-body']}>
              <div>
                <Input
                  id='date'
                  name='date'
                  label='Fecha'
                  type='date'
                  value={new Date().toISOString().split('T')[0]}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div>
                <Input
                  id='companyRuc'
                  name='companyRuc'
                  label='RUC Empresa'
                  placeholder='Ejem: 1055478962'
                  value={form.companyRuc}
                  onChange={handleChange}
                />
              </div>
              <Input
                label='Subtotal'
                name='subTotal'
                type='number'
                value={amounts.subtotal}
                readOnly
              />
              <Input
                label='IGV'
                name='igv'
                value={amounts.igv}
                readOnly
              />
              <Input
                label='Total'
                name='total'
                value={amounts.total}
                readOnly
              />
              <Button onClick={sendSale} disabled={!products.length}>
                Registrar venta
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles['card-header']}>Productos</div>
            <div className={styles['card-body']}>
              <form className={styles['form-group']} onSubmit={handleChangeProduct2}>
                <Search
                  label='Producto'
                  id='productCode'
                  name='productCode'
                  type='tel'
                  onSelect={handleChangeProduct}
                  fetchSuggestions={getSuggestionsProducts}
                  keyField='code'
                  labelField='name'
                />
                <Input
                  label='Cantidad'
                  id='productQuantity'
                  name='productQuantity'
                  type='number'
                  value={formProduct.productQuantity}
                  onChange={handleChangeProduct}
                />
                <Input
                  label='Precio'
                  id='productPrice'
                  name='productPrice'
                  type='number'
                  value={formProduct.productPrice}
                  onChange={handleChangeProduct}
                />
                <div style={{ alignSelf: 'center' }}>
                  <Button>
                    Añadir
                  </Button>
                </div>
              </form>
            </div>
            <div>
              <Table
                data={products}
                columns={columnProperties}
                fnDelete={handleDeleteProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default POSPage
