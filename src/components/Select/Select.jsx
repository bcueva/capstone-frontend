import PropTypes from 'prop-types'
import styles from './Select.module.css'

const Select = ({ id, label, icon, value = '', children, ...props }) => {
  return (
    <div className={styles.select__wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {icon}
      <select id={id} className={styles.select} value={value} {...props}>
        {children}
      </select>
    </div>
  )
}

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  value: PropTypes.string,
  children: PropTypes.node
}

export default Select
