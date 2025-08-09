import useForm from '../../hooks/useForm'
import styles from './Pos.module.css'
import { useEffect, useState } from 'react'
// import { getProductForSale } from '../../services/product'
import { toast, Toaster } from 'sonner'
import { postSale } from '../sales/saleService'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Table from '../../components/Table/Table'
import { getProductByCode } from '../products/productService'
import { getAllTables } from '../tables/tableService'
import Search from '../../components/Search/Search'
import { getSuggestionsProducts } from './posService'
import Select from '../../components/Select/Select'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useAuthStore } from '../../stores/useAuthStore'
import logo from '../../assets/images/logo'

const columnProperties = [
  { text: 'Código', property: 'code' },
  { text: 'Producto', property: 'name' },
  { text: 'Cantidad', property: 'quantity' },
  { text: 'Precio', property: 'price' },
  { text: 'Observaciones', property: 'observations' },
  { text: 'Total', property: 'total' }
]

const getDatetime = (format) => {
  const now = new Date()

  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  format = format.replaceAll('YYYY', year)
  format = format.replaceAll('MM', month)
  format = format.replaceAll('DD', day)
  format = format.replaceAll('hh', hours)
  format = format.replaceAll('mm', minutes)
  format = format.replaceAll('ss', seconds)

  return format
}

const POSPage = () => {
  const user = useAuthStore((state) => state.user)
  const { form, handleChange } = useForm()
  const {
    form: formProduct,
    handleChange: handleChangeProduct,
    updateForm
  } = useForm()

  const [amounts, setAmounts] = useState({
    total: '0',
    igv: '0',
    subtotal: '0'
  })

  const [products, setProducts] = useState([])
  const [tables, setTables] = useState([])

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

  const handleSelectProduct = async (product) => {
    const newForm = {
      productCode: product.code,
      productPrice: product.price,
      productQuantity: 1
    }
    updateForm(newForm)
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

      const price = parseFloat(formProduct.productPrice)

      const product = {
        ...res.data,
        price,
        quantity: formProduct.productQuantity,
        total: price * formProduct.productQuantity,
        observations: formProduct.observations
      }

      updateProducts([...products, product])
      updateForm({
        productCode: '',
        productPrice: '',
        productQuantity: '',
        observation: ''
      })
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
        generarBoleta()
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

  useEffect(() => {
    getAllTables().then((res) => {
      setTables(res.data)
    })

    return () => {}
  }, [])

  const generarBoleta = () => {
    // Configurar tamaño tipo ticket (80mm x 200mm)
    const doc = new jsPDF({
      unit: 'mm',
      format: [80, 200]
    })

    let y = 10

    // Logo (opcional si tienes en base64 o url)
    doc.addImage(logo, 'PNG', 25, y, 30, 15)
    y += 18

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('Asturiano Coffe Y Tasty Food S.A.C.', 40, y, { align: 'center' })
    y += 4
    doc.text('20612437000', 40, y, { align: 'center' })
    y += 4
    doc.text('Trujillo, La Libertad', 40, y, { align: 'center' })
    y += 4
    doc.text('Local: ASTURIANO COFFE Y TASTY FOOD', 40, y, { align: 'center' })
    y += 6

    // Datos boleta
    doc.setFont('helvetica', 'bold')
    doc.text('Boleta de venta electrónica', 40, y, { align: 'center' })
    y += 4
    doc.setFont('helvetica', 'normal')
    doc.text('B003 - 00096052', 40, y, { align: 'center' })
    y += 6

    doc.text(`F. Emisión: ${getDatetime('DD/MM/AAAA hh:mm:ss')}`, 5, y)
    y += 4
    doc.text('Caja: A010/323', 5, y)
    y += 4
    doc.text(`Cajero: ${user.name} ${user.last_name}`, 5, y)
    y += 4
    doc.text('Orden: A003 - 00013977', 5, y)
    y += 6

    // Tabla productos
    autoTable(doc, {
      startY: y,
      margin: { left: 5, right: 5 },
      head: [['Descripción', 'P.U.', 'Cant.', 'Total']],
      body: products.map((product) => [
        product.name,
        product.price,
        product.quantity,
        product.total
      ]),
      theme: 'plain',
      styles: { fontSize: 8, cellPadding: 1 },
      headStyles: { fontStyle: 'bold' }
    })

    y = doc.lastAutoTable.finalY + 4

    // Totales
    doc.text(`Sub Total: S/ ${amounts.subtotal}`, 5, y)
    y += 4
    doc.text(`IGV: S/ ${amounts.igv}`, 5, y)
    y += 4
    doc.setFont('helvetica', 'bold')
    doc.text(`Importe total: S/ ${amounts.total}`, 5, y)
    y += 6

    // Pie de página
    doc.setFontSize(7)
    doc.text(
      'Representación impresa de la boleta de venta electrónica',
      40,
      y,
      { align: 'center' }
    )

    // Guardar PDF
    doc.autoPrint()
    window.open(doc.output('bloburl'))
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
                  value={getDatetime('YYYY-MM-MM')}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div>
                <Select
                  id='number'
                  name='number'
                  label='N° mesa'
                  placeholder='Ejem: 1'
                  value={form.number}
                  onChange={handleChange}
                >
                  {tables.map(({ id, number }) => (
                    <option key={id} value={id}>
                      {number}
                    </option>
                  ))}
                </Select>
              </div>
              <Input
                label='Subtotal'
                name='subTotal'
                type='number'
                value={amounts.subtotal}
                readOnly
              />
              <Input label='IGV' name='igv' value={amounts.igv} readOnly />
              <Input
                label='Total'
                name='total'
                value={amounts.total}
                readOnly
              />
              <Button onClick={sendSale} disabled={!products.length}>
                Registrar venta
              </Button>
              <Button onClick={generarBoleta}>Registrar venta</Button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles['card-header']}>Productos</div>
            <div className={styles['card-body']}>
              <form
                className={styles['form-group']}
                onSubmit={handleChangeProduct2}
              >
                <Search
                  label='Producto'
                  id='productCode'
                  name='productCode'
                  type='tel'
                  onSelect={handleSelectProduct}
                  fetchSuggestions={getSuggestionsProducts}
                  keyField='code'
                  labelField='name'
                  value={formProduct.productCode}
                />
                <Input
                  label='Precio'
                  id='productPrice'
                  name='productPrice'
                  type='number'
                  value={formProduct.productPrice}
                  readOnly
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
                  label='Observaciones'
                  id='observations'
                  name='observations'
                  type='text'
                  value={formProduct.observations}
                  onChange={handleChangeProduct}
                />
                <div style={{ alignSelf: 'center' }}>
                  <Button>Añadir</Button>
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
