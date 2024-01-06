import { Select } from '@nextui-org/react'
import { Criterias } from '@renderer/types/criterias.types'
import { useEffect, useState } from 'react'
const PointsForm = (): JSX.Element => {
  const [criterias, setCriterias] = useState<Criterias>()
  const [error, setError] = useState('')

  useEffect(() => {
    const getCriterias = async () => {
      try {
        const res = await window.api.getCriterias()
        setCriterias(res)
      } catch (error) {
        setError('No se pudo obtener las criterias')
      }
    }
    getCriterias()
  })

  return <div></div>
}

export default PointsForm
