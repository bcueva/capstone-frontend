import styles from './SidebarItem.module.css'
import PropTypes from 'prop-types'

const SidebarItem = ({ href, text, icon }) => {
  return (
    <li className={styles['sidebar-item']}>
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
  icon: PropTypes.element
}

export default SidebarItem
