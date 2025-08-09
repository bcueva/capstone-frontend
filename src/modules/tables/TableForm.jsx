import PropTypes from 'prop-types'
import useForm from '../../hooks/useForm'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Dialog from '../../components/Dialog/Dialog'
import Checkbox from '../../components/Checkbox/Checkbox'

const TableForm = ({ isOpen, table, onSubmit, onCancel }) => {
  const { form, handleChange, handleSubmit } = useForm(table)

  const submitText = table ? 'Editar' : 'Crear'

  return (
    <Dialog open={isOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Input
          id='number'
          type='number'
          name='number'
          label='N° mesa'
          value={form.number}
          onChange={handleChange}
        />
        <Input
          id='capacity'
          type='number'
          name='capacity'
          label='Capacidad'
          value={form.capacity}
          onChange={handleChange}
        />
        <Checkbox
          id='is_active'
          label='Estado'
          name='is_active'
          checked={form?.is_active || true}
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
          <Button type='button' variant='ghost' onClick={onCancel}>
            {' '}
            Cancelar
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

TableForm.propTypes = {
  isOpen: PropTypes.bool,
  table: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export default TableForm
