import PropTypes from 'prop-types'
import useForm from '../../hooks/useForm'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Dialog from '../../components/Dialog/Dialog'

const PermissionForm = ({ isOpen, sale, onSubmit, onCancel }) => {
  const { form, handleChange, handleSubmit } = useForm(sale)

  const submitText = sale ? 'Editar' : 'Crear'

  return (
    <Dialog open={isOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Input
          id='date'
          type='date'
          name='date'
          label='Fecha'
          value={form.date}
          onChange={handleChange}
        />
        <Input
          id='company'
          type='text'
          name='company'
          label='Empresa'
          value={form.company}
          onChange={handleChange}
        />
        <Input
          id='user'
          type='text'
          name='user'
          label='Usuario'
          value={form.user}
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
  sale: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export default PermissionForm
