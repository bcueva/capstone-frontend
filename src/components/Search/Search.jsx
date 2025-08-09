import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Search.module.css'

const Search = ({
  id,
  name,
  label,
  icon,
  value = '',
  onSelect,
  fetchSuggestions,
  keyField,
  labelField,
  ...props
}) => {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState([])

  const handleChange = (evt) => {
    const { value } = evt.target
    setQuery(value)

    if (value?.length > 3) {
      fetchSuggestions({ query: value })
        .then(({ data }) => setSuggestions(data))
        .catch(() => setSuggestions([]))
    }
  }

  const handleSelect = (suggestion) => {
    setQuery(suggestion[labelField])
    setSuggestions([])
    if (onSelect) {
      onSelect(suggestion)
    }
    setSuggestions([])
  }

  return (
    <div className={styles.input__wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {icon}
      <input
        id={id}
        name={name}
        className={styles.input}
        value={query}
        onChange={handleChange}
        {...props}
      />

      {suggestions?.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion, i) => (
            <li key={i} className={styles['suggestion-item']} onClick={() => handleSelect(suggestion)}>
              {suggestion[labelField]}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

Search.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  value: PropTypes.string
}

export default Search
