import PropTypes from 'prop-types'
import styles from './ImageUpload.module.css'

const ImageUpload = ({ id, label, ...props }) => {
  return (
    <label htmlFor={id} className={styles['drop-container']}>
      <span className={styles['drop-title']}>{label}</span>
      or
      <input id={id} className={styles['file-input']} type='file' accept='image/*' required='' {...props} />
    </label>
  )
}

ImageUpload.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string
}

export default ImageUpload
