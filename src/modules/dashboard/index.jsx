import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  LineChart,
  PieChart,
  Legend,
  Cell,
  Pie
} from 'recharts'
import { getCumulativeSales, getDistributionProducts, getMonthlySales } from './service'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Dashboard = () => {
  const [monthlySales, setMonthlySales] = useState([])
  const [cumulativeSales, setCumulativeSales] = useState([])
  const [distributionProducts, setDistributionProducts] = useState([])

  useEffect(() => {
    getMonthlySales().then(res => setMonthlySales(res.data))

    return () => {

    }
  }, [])

  useEffect(() => {
    getCumulativeSales().then(res => setCumulativeSales(res.data))

    return () => {

    }
  }, [])

  useEffect(() => {
    getDistributionProducts().then(res => setDistributionProducts(res.data))

    return () => {

    }
  }, [])

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <div
        style={{
          width: '48%',
          height: 300,
          padding: '24px',
          borderRadius: '1rem',
          background: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0.25rem 1rem'
        }}
      >
        <h3>Ventas Mensuales</h3>
        <ResponsiveContainer>
          <BarChart data={monthlySales}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='amount' fill='#8884d8' name='Monto' />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          width: '48%',
          height: 300,
          padding: '24px',
          borderRadius: '1rem',
          background: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0.25rem 1rem'
        }}
      >
        <h3>Ventas Acumuladas</h3>
        <ResponsiveContainer>
          <LineChart data={cumulativeSales}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='esperadas' stroke='#82ca9d' strokeWidth={2} name='Esperadas' />
            <Line type='monotone' dataKey='accumulated' stroke='#8884d8' strokeWidth={2} name='Reales' />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          width: '48%',
          height: 300,
          padding: '24px',
          borderRadius: '1rem',
          background: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0.25rem 1rem'
        }}
      >
        <h3>Distribución de Productos Vendidos</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={distributionProducts}
              dataKey='quantity'
              nameKey='product'
              cx='50%'
              cy='50%'
              outerRadius={90}
              label
            >
              {distributionProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard
