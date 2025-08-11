import PropTypes from 'prop-types'
import styles from './Table.module.css'
import Button from '../Button/Button'
import XIcon from '../../assets/icons/XIcon'
import CheckIcon from '../../assets/icons/CheckIcon'

const Table = ({ data, columns, fnEdit, fnDelete, fnActions }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {columns.map((column, i) => (
            <th className={styles.th} key={i}>
              {column.text}
            </th>
          ))}
          {fnEdit && <th className={styles.th}>Editar</th>}
          {fnDelete && <th className={styles.th}>Eliminar</th>}
          {fnActions && <th className={styles.th}>Acciones</th>}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((row) => (
          <tr key={row.id} className={styles.tr}>
            {columns.map((column, i) => (
              <td key={`row-${row.id}-col-${i}`} className={styles.td}>
                {(() => {
                  const value = row[column.property]

                  if (column.type === 'date') {
                    return value?.split?.('T')?.[0] || ''
                  }

                  if (column.type === 'boolean') {
                    return value
                      ? (
                        <CheckIcon
                          style={{
                            width: '1.5rem',
                            objectFit: 'contain',
                            color: '#008F39'
                          }}
                        />
                        )
                      : (
                        <XIcon
                          style={{
                            width: '1.5rem',
                            objectFit: 'contain',
                            color: '#FF0000'
                          }}
                        />
                        )
                  }

                  return value
                })()}
              </td>
            ))}
            {fnEdit && (
              <td className={styles.td}>
                <Button onClick={() => fnEdit(row)}>Editar</Button>
              </td>
            )}
            {fnDelete && (
              <td className={styles.td}>
                <Button variant='danger' onClick={() => fnDelete(row)}>
                  Eliminar
                </Button>
              </td>
            )}
            {fnActions &&
              fnActions.map((fnAction, id) =>
                !row[fnAction.show]
                  ? (
                    <td key={`btnAction-${id}`} className={styles.td}>
                      <Button onClick={() => fnAction.function(row)}>
                        {fnAction.label}
                      </Button>
                    </td>
                    )
                  : null
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  fnEdit: PropTypes.func,
  fnDelete: PropTypes.func
}

export default Table
