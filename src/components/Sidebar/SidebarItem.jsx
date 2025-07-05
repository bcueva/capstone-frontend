import styles from './SidebarItem.module.css'
import PropTypes from 'prop-types'

const SidebarItem = ({ href, text, icon, onClick }) => {
  return (
    <li className={styles['sidebar-item']} onClick={onClick}>
      <a href={href}>
        {icon}
        <span className={styles.text}>{text}</span>
      </a>
    </li>
  )
}

SidebarItem.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.any
}

export default SidebarItem
