import PropTypes from 'prop-types'
import styles from './Dialog.module.css'

const Dialog = ({ open, children, ...props }) => {
  if (!open) return null

  return (
    <div className={styles.overlay}>
      <dialog
        open={open}
        className={styles.dialog}
        {...props}
      >
        {children}
      </dialog>
    </div>
  )
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default Dialog
