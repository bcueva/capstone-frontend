import { useEffect } from 'react'
import { Route, Switch, useLocation } from 'wouter'
import Sidebar from './components/Sidebar/Sidebar'
import UserList from './modules/users/UserList'
import ProductList from './modules/products/ProductList'
import RoleList from './modules/roles/RoleList'
import PermissionList from './modules/permissions/PermissionList'
import SaleList from './modules/sales/SaleList'
import CompanyList from './modules/companies/CompanyList'
import TableList from './modules/tables/TableList'
import POSPage from './modules/pos'
import { useAuthStore } from './stores/useAuthStore'
import Dashboard from './modules/dashboard'

const ProtectedRoutes = () => {
  const [, setLocation] = useLocation()
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    const { isAuthenticated } = checkAuth()
    if (!isAuthenticated) {
      setLocation('/login')
    }
  }, [setLocation])

  return (
    <>
      <Sidebar />
      <main
        style={{
          position: 'absolute',
          top: 0,
          left: '16rem',
          height: '100vh',
          width: 'calc(100% - 16rem)',
          backgroundColor: 'var(--body-color)',
          transition: 'var(--tran-05)',
          padding: '1rem'
        }}
      >
        <Switch>
          <Route path='/' component={Dashboard} />
          <Route path='/usuarios' component={UserList} />
          <Route path='/roles' component={RoleList} />
          <Route path='/permisos' component={PermissionList} />
          <Route path='/productos' component={ProductList} />
          <Route path='/empresas' component={CompanyList} />
          <Route path='/mesas' component={TableList} />
          <Route path='/ventas' component={SaleList} />
          <Route path='/pos' component={POSPage} />
          <Route path='/pos/:id' component={POSPage} />
          <Route>404 - Página no encontrada</Route>
        </Switch>
      </main>
    </>
  )
}

export default ProtectedRoutes
