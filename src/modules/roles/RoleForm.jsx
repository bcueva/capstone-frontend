import PropTypes from 'prop-types'
import useForm from '../../hooks/useForm'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Dialog from '../../components/Dialog/Dialog'
import Checkbox from '../../components/Checkbox/Checkbox'

const RoleForm = ({
  isOpen,
  permissions,
  role,
  onSubmit,
  onCancel
}) => {
  const { form, handleChange, handleSubmit } = useForm(role)

  const submitText = role ? 'Editar' : 'Crear'

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
          id='description'
          type='text'
          name='description'
          label='Descripción'
          value={form.description}
          onChange={handleChange}
        />
        <p>Permisos</p>
        {permissions.map((permission) => (
          <Checkbox
            key={permission.id}
            id={`permission_${permission.id}`}
            label={permission.name}
            name={`permissions.${permission.id}`}
            checked={form?.permissions?.[permission.id]}
            onChange={handleChange}
          />
        ))}
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

RoleForm.propTypes = {
  isOpen: PropTypes.bool,
  permissions: PropTypes.array,
  role: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export default RoleForm
