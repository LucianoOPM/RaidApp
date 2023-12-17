import CriteriaTable from '@renderer/components/criteriasViewComponents/CriteriaTable'
import CriteriasForm from '@renderer/components/criteriasViewComponents/CriteriasForm'
import { useState } from 'react'

const CriteriasList = (): JSX.Element => {
  const [registered, setRegisreted] = useState(false)
  const handleRegistered = (): void => setRegisreted(true)
  return (
    <div>
      <CriteriasForm setRegister={handleRegistered} />
      <CriteriaTable registered={registered} />
    </div>
  )
}

export default CriteriasList
