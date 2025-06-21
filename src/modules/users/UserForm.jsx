import PropTypes from 'prop-types'
import useForm from '../../hooks/useForm'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Dialog from '../../components/Dialog/Dialog'
import Select from '../../components/Select/Select'

const UserForm = ({ isOpen, user, roles, onSubmit, onCancel }) => {
  const { form, handleChange, handleSubmit } = useForm(user)

  const submitText = user ? 'Editar' : 'Crear'

  return (
    <Dialog open={isOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Input
          id='name'
          type='text'
          name='name'
          label='Nombre'
          value={form.name}
          onChange={handleChange}
        />
        <Input
          id='last_name'
          type='text'
          name='last_name'
          label='Apellidos'
          value={form.last_name}
          onChange={handleChange}
        />
        <Input
          id='email'
          type='text'
          name='email'
          label='Correo'
          value={form.email}
          onChange={handleChange}
        />
        <Input
          id='phone'
          type='text'
          name='phone'
          label='Telefono'
          value={form.phone}
          onChange={handleChange}
        />
        <Select
          id='role_id'
          type='text'
          name='role_id'
          label='Rol'
          value={form.role_id}
          onChange={handleChange}
        >
          {
            roles.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))
          }
        </Select>
        <div
          style={{
            paddingTop: '1rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}
        >
          <Button type='submit'>{submitText}</Button>
          <Button type='button' variant='ghost' onClick={onCancel}>Cancelar</Button>
        </div>
      </form>
    </Dialog>
  )
}

UserForm.propTypes = {
  isOpen: PropTypes.bool,
  user: PropTypes.any,
  roles: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export default UserForm
