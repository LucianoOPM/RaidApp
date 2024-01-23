import { Button, Option, Select } from '@material-tailwind/react'
import { CriteriaSave, Criterias } from '@renderer/types/criterias.types'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
const PointsForm = (): JSX.Element => {
  const [criterias, setCriterias] = useState<Criterias>()
  const [selectedCriteria, setSelectedCriteria] = useState<CriteriaSave[]>([])

  useEffect(() => {
    const getCriterias = async (): Promise<void> => {
      try {
        const res = await window.api.getCriterias()
        if (res.code === 200 && 'payload' in res) {
          const data = JSON.parse(res.payload)
          setCriterias(data)
        }
        if (res.code !== 200 && 'error' in res) {
          throw 'No se pudo obtener las criterias'
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener las criterias',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    }
    getCriterias()
  }, [])

  const handleSave = (): void => {
    console.log(selectedCriteria)
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center mt-2">
        {criterias?.map((criteria, index) => {
          return (
            <div key={index} className="w-1/3 mb-2 ml-2">
              <Select
                placeholder={''}
                label={criteria.name}
                className="bg-white"
                onChange={(e) => {
                  const selected = {
                    id: criteria?.idCriteria || 0,
                    value: e || '0'
                  }
                  setSelectedCriteria([...selectedCriteria, selected])
                }}
              >
                {criteria.CriteriaValues.map((value, index) => {
                  return (
                    <Option key={index} value={value.realValue.toString() || '0'}>
                      {value.inGameValue || 'No hay valores'}
                    </Option>
                  )
                })}
              </Select>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center items-center space-x-2">
        <div>
          <Button placeholder={''} onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PointsForm
