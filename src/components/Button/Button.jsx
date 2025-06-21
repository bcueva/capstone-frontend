import PropTypes from 'prop-types'
import styles from './Button.module.css'

const Button = ({ children, variant = 'primary', ...props }) => {
  const className = styles.button + ' ' + styles[variant]

  return (
    <button className={className} {...props}>{children}</button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string
}

export default Button
