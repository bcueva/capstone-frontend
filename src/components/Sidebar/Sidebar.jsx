import SidebarItem from './SidebarItem.jsx'
import styles from './Sidebar.module.css'
import logo from '../../assets/images/logo.png'
import BoxIcon from '../../assets/icons/BoxIcon.jsx'
import CartIcon from '../../assets/icons/CartIcon.jsx'
import TagIcon from '../../assets/icons/TagIcon.jsx'
import HomeIcon from '../../assets/icons/HomeIcon.jsx'
import UsersIcon from '../../assets/icons/UsersIcon.jsx'
import LockIcon from '../../assets/icons/LockIcon.jsx'
import BriefcaseIcon from '../../assets/icons/BriefcaseIcon.jsx'
import CalculatorIcon from '../../assets/icons/CalculatorIcon.jsx'
import { useAuthStore } from '../../stores/useAuthStore.jsx'
import { useLocation } from 'wouter'
import CloseIcon from '../../assets/icons/CloseIcon.jsx'

const Sidebar = () => {
  const [, setLocation] = useLocation()
  const logout = useAuthStore((state) => state.logout)
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const { user } = checkAuth()

  return (
    <nav className={styles.sidebar}>
      <div className={styles['sidebar-top-wrapper']}>
        <div className={styles['sidebar-top']}>
          <a href='/'>
            <img className={styles.logo} src={logo} alt='Lúcuma logo' />
          </a>
        </div>
      </div>
      <ul className={styles['sidebar-links']}>
        {user.permissions.includes('Dashboard') && (
          <SidebarItem href='/' text='Dashboard' icon={<HomeIcon />} />
        )}
        {user.permissions.includes('PermisosR') && (
          <SidebarItem href='/permisos' text='Permisos' icon={<LockIcon />} />
        )}
        {user.permissions.includes('RolesR') && (
          <SidebarItem href='/roles' text='Roles' icon={<TagIcon />} />
        )}
        {user.permissions.includes('UsuariosR') && (
          <SidebarItem href='/usuarios' text='Usuarios' icon={<UsersIcon />} />
        )}
        {user.permissions.includes('ProductosR') && (
          <SidebarItem href='/productos' text='Productos' icon={<BoxIcon />} />
        )}
        {user.permissions.includes('EmpresasR') && (
          <SidebarItem
            href='/empresas'
            text='Empresas'
            icon={<BriefcaseIcon />}
          />
        )}
        {user.permissions.includes('VentasC') && (
          <SidebarItem href='/pos' text='POS' icon={<CalculatorIcon />} />
        )}
        {user.permissions.includes('VentasR') && (
          <SidebarItem href='/ventas' text='Ventas' icon={<CartIcon />} />
        )}
        <SidebarItem
          onClick={() => {
            logout()
            setLocation('/login')
          }} text='Cerrar sesión' icon={<CloseIcon />}
        />
      </ul>
    </nav>
  )
}

export default Sidebar
