import PropTypes from 'prop-types'
import styles from './Table.module.css'
import Button from '../Button/Button'

const Table = ({ data, columns, fnEdit, fnDelete }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {columns.map((column, i) => (
            <th className={styles.th} key={i}>{column.text}</th>
          ))}
          {fnEdit && <th className={styles.th}>Editar</th>}
          {fnDelete && <th className={styles.th}>Eliminar</th>}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((row) => (
          <tr key={row.id} className={styles.tr}>
            {columns.map((column, i) => (
              <td key={`row-${row.id}-col-${i}`} className={styles.td}>
                {column.type === 'date'
                  ? (
                      row[column.property].split('T')[0]
                    )
                  : (
                      row[column.property]
                    )}
              </td>
            ))}
            {fnEdit && <td className={styles.td}><Button onClick={() => fnEdit(row)}>Editar</Button></td>}
            {fnDelete && <td className={styles.td}><Button variant='danger' onClick={() => fnDelete(row)}>Eliminar</Button></td>}
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
