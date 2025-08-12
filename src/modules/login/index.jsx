import { useLocation } from 'wouter'
import Button from '../../components/Button/Button'
import Dialog from '../../components/Dialog/Dialog'
import Input from '../../components/Input/Input'
import useForm from '../../hooks/useForm'
import { useAuthStore } from '../../stores/useAuthStore'
import logo from '../../assets/images/logo.png'
import Banner from '../../components/Banner/Banner'

const Login = () => {
  const [, setLocation] = useLocation()
  const { form, handleChange, handleSubmit } = useForm()
  const login = useAuthStore((state) => state.login)
  const error = useAuthStore((state) => state.error)

  const handleLogin = async (form) => {
    const { isAuthenticated } = await login(form)
    if (isAuthenticated) {
      setLocation('/pos')
    }
  }

  return (
    <Dialog open>
      <form
        onSubmit={handleSubmit(handleLogin)}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Banner message={error} />
        <figure>
          <img style={{ width: '100%' }} src={logo} alt='Asturiano logo' />
        </figure>
        <Input
          id='email'
          type='email'
          name='email'
          label='Correo'
          value={form.email}
          onChange={handleChange}
        />
        <Input
          id='password'
          type='password'
          name='password'
          label='Contraseña'
          value={form.password}
          onChange={handleChange}
        />
        <div
          style={{
            paddingTop: '1rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}
        >
          <Button type='submit'>Ingresar</Button>
        </div>
      </form>
    </Dialog>
  )
}

export default Login
