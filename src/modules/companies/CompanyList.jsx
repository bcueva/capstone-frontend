import Table from '../../components/Table/Table'
import { useEffect, useState } from 'react'
import {
  deleteCompany,
  getAllCompanies,
  patchCompany,
  postCompany
} from './companyService'
import { columns } from './constants'
import Button from '../../components/Button/Button'
import useModal from '../../hooks/useModal'
import CompanyForm from './CompanyForm'

const CompanyList = (props) => {
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  useEffect(() => {
    getAllCompanies().then((res) => {
      if (res.status === 'success') {
        setCompanies(res.data)
      }
    })
    return () => {}
  }, [])

  const createCompany = async (company) => {
    const res = await postCompany(company)
    if (res.status === 'success') {
      setCompanies((prev) => [...prev, res.data])
    }
    closeModal('createCompany')
  }

  const editCompany = async (company) => {
    const res = await patchCompany(company)
    if (res.status === 'success') {
      setCompanies((prev) =>
        prev.map((c) => (c.id === company.id ? res.data : c))
      )
    }
    closeModal('editCompany')
  }

  const removeCompany = async (company) => {
    const res = await deleteCompany({ id: company.id })
    if (res.status === 'success') {
      setCompanies((prev) =>
        prev.filter((c) => c.id !== company.id)
      )
    }
  }

  return (
    <>
      <CompanyForm
        isOpen={isModalOpen('createCompany')}
        onSubmit={createCompany}
        onCancel={() => closeModal('createCompany')}
      />
      <CompanyForm
        isOpen={isModalOpen('editCompany')}
        company={selectedCompany}
        onSubmit={editCompany}
        onCancel={() => closeModal('editCompany')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px'
        }}
      >
        <h2>Empresas</h2>
        <Button onClick={() => openModal('createCompany')}>
          Nueva empresa
        </Button>
      </div>
      <Table
        data={companies}
        columns={columns}
        fnEdit={(company) => {
          setSelectedCompany(company)
          openModal('editCompany')
        }}
        fnDelete={removeCompany}
      />
    </>
  )
}

CompanyList.propTypes = {}

export default CompanyList
