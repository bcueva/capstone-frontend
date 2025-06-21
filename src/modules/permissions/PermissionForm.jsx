import PropTypes from 'prop-types'
import useForm from '../../hooks/useForm'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Dialog from '../../components/Dialog/Dialog'

const PermissionForm = ({ isOpen, permission, onSubmit, onCancel }) => {
  const { form, handleChange, handleSubmit } = useForm(permission)

  const submitText = permission ? 'Editar' : 'Crear'

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
          value={form.description || ''}
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
          <Button type='submit'>{submitText}</Button>
          <Button type='button' variant='ghost' onClick={onCancel}> Cancelar</Button>
        </div>
      </form>
    </Dialog>
  )
}

PermissionForm.propTypes = {
  isOpen: PropTypes.bool,
  permission: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export default PermissionForm
