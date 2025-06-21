import PropTypes from 'prop-types'
import styles from './Input.module.css'

const Input = ({ id, label, icon, value = '', ...props }) => {
  return (
    <div className={styles.input__wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {icon}
      <input id={id} className={styles.input} value={value} {...props} />
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  value: PropTypes.string
}

export default Input
