import { Button, Input } from '@material-tailwind/react'
import { ValueDb, inputValues } from '@renderer/types/values.type'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const CriteriaInfo = (): JSX.Element => {
  const { id } = useParams()
  const { state: nombre } = useLocation()
  if (!id) {
    return <div>No hay id</div>
  }
  const [formData, setFormData] = useState<inputValues[]>([])
  useEffect(() => {
    const loadValues = async (): Promise<void> => {
      try {
        const res = await window.api.getByCriteria(id)
        if ('error' in res) {
          throw new Error(res.error)
        }
        const parsed: ValueDb[] = JSON.parse(res.payload)
        const newInputData: inputValues[] = []
        parsed.forEach((value) => {
          newInputData.push({
            idCritValue: value.idCritValue.toString(),
            inGameValue: value.inGameValue,
            realValue: value.realValue === 0 && !value.inGameValue ? '' : value.realValue.toString()
          })
        })
        setFormData(newInputData)
      } catch (error) {
        console.error(error)
      }
    }
    loadValues()
  }, [])

  const clearValues = (): void => {
    const resetValues: inputValues[] = []
    formData.forEach((value) => {
      resetValues.push({
        idCritValue: value.idCritValue,
        inGameValue: '',
        realValue: ''
      })
    })
    setFormData(resetValues)
  }

  const handleSave = async (): Promise<void> => {
    try {
      const res = await window.api.updateValues(formData)
      if (res.code === 200) {
        clearValues()
        Swal.fire({
          icon: 'success',
          title: 'Datos actualizados',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar los datos'
      })
    }
  }

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <h1 className="">
          Configuración del criterio <strong>{nombre}</strong>
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap w-1/2 justify-center items-center">
          {formData.map(({ inGameValue, realValue }, index) => {
            return (
              <div key={index} className="w-1/3 mx-2">
                <h1 className="mt-2">{`Valor ${index + 1}`}</h1>
                <Input
                  className="bg-white"
                  label={`Valor in-game ${index + 1}`}
                  crossOrigin={''}
                  type="text"
                  value={inGameValue}
                  required
                  onChange={(e) => {
                    const newInputData = [...formData]
                    newInputData[index].inGameValue = e.target.value
                    setFormData(newInputData)
                  }}
                />
                <Input
                  label={`Valor real ${index + 1}`}
                  className="bg-white"
                  crossOrigin={''}
                  type="text"
                  value={realValue}
                  required
                  onChange={(e) => {
                    const newInputData = [...formData]
                    const justNumbers = e.target.value.replace(/[^0-9.-]/g, '')
                    newInputData[index].realValue = justNumbers
                    setFormData(newInputData)
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-center">
          <Button placeholder={''} className="mr-2" onClick={handleSave}>
            Guardar
          </Button>

          <Button placeholder={''} className="ml-2" onClick={clearValues}>
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  )
}
export default CriteriaInfo
