import { Route, Switch } from 'wouter'
import './App.css'
import ProtectedRoutes from './ProtectedRoutes'
import Login from './modules/login'

function App () {
  return (
    <>
      <Switch>
        <Route path='/login' component={Login} />
        <ProtectedRoutes />
        <Route>404: No such page!</Route>
      </Switch>
    </>
  )
}

export default App
