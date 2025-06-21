import PropTypes from 'prop-types'
import useForm from '../../hooks/useForm'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Dialog from '../../components/Dialog/Dialog'

const CompanyForm = ({ isOpen, company, onSubmit, onCancel }) => {
  const { form, handleChange, handleSubmit } = useForm(company)

  const submitText = company ? 'Editar' : 'Crear'

  return (
    <Dialog open={isOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Input
          id='ruc'
          type='number'
          name='ruc'
          label='RUC'
          value={form.ruc}
          onChange={handleChange}
        />
        <Input
          id='name'
          type='text'
          name='name'
          label='Nombre'
          value={form.name}
          onChange={handleChange}
        />
        <Input
          id='phone'
          type='tel'
          name='phone'
          label='Telefono'
          value={form.phone || ''}
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

CompanyForm.propTypes = {
  isOpen: PropTypes.bool,
  company: PropTypes.any,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export default CompanyForm
