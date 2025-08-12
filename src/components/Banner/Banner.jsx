import styles from './Banner.module.css'

const Banner = ({ message }) => {
  if (!message) return null

  return (
    <div className={styles.banner}>
      {message}
    </div>
  )
}

export default Banner
