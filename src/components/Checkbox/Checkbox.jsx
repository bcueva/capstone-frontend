import PropTypes from 'prop-types'
import styles from './Checkbox.module.css'

const Checkbox = ({ id, label, checked = false, ...props }) => {
  return (
    <div className={styles.checkbox}>
      <input
        id={id}
        className={styles.checkbox__input}
        type='checkbox'
        checked={checked}
        {...props}
      />
      <label htmlFor={id} className={styles.checkbox__label}>
        <span className={styles.checkbox__box}>
          <svg viewBox='0 0 12 10' className={styles.checkbox__icon}>
            <polyline points='1.5 6 4.5 9 10.5 1' />
          </svg>
        </span>
        <span className={styles.checkbox__text}>{label}</span>
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool
}

export default Checkbox
