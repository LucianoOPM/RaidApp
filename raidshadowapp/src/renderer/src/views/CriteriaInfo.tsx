import { Button, Input } from '@material-tailwind/react'
import { SaveValueDb, ValueDb } from '@renderer/types/values.type'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const inputQuantity = 5
interface inputData {
  inGameValue: string
  realValue: string
}
const inputValues: inputData[] = []
for (let i = 1; i <= inputQuantity; i++) {
  inputValues.push({
    inGameValue: '',
    realValue: ''
  })
}

const CriteriaInfo = (): JSX.Element => {
  const { id } = useParams()
  const { state: nombre } = useLocation()
  if (!id) {
    return <div>No hay id</div>
  }
  const [inputData, setInputData] = useState<inputData[]>(inputValues)

  useEffect(() => {
    const loadValues = async (): Promise<void> => {
      try {
        const res = await window.api.getByCriteria(id)
        if ('error' in res) {
          throw new Error(res.error)
        }
        const parsed: ValueDb[] = JSON.parse(res.payload)
        const newInputData: inputData[] = []
        parsed.forEach((value) => {
          newInputData.push({
            inGameValue: value.inGameValue,
            realValue: value.realValue.toString()
          })
        })
        setInputData(newInputData)
      } catch (error) {
        console.error(error)
      }
    }
    loadValues()
  }, [])

  const handleSave = async (): Promise<void> => {
    try {
      const saveValues: SaveValueDb[] = []
      inputData.forEach((value) => {
        saveValues.push({
          inGameValue: value.inGameValue,
          realValue: Number(value.realValue)
        })
      })

      const valuesRes = await window.api.updateValues(Number(id), saveValues)
      if ('error' in valuesRes) {
        throw new Error(valuesRes.error)
      }
      const resPayload: ValueDb[] = JSON.parse(valuesRes.payload)
      console.log(resPayload)
    } catch (error) {
      console.error(error)
    }
  }

  const clearValues = (): void => {
    const newInputData: inputData[] = []
    for (let i = 1; i <= inputQuantity; i++) {
      newInputData.push({
        inGameValue: '',
        realValue: ''
      })
    }
    setInputData(newInputData)
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
          {inputData.map(({ inGameValue, realValue }, index) => {
            return (
              <div key={index} className="w-1/3 mx-2">
                <h1 className="mt-2">{`Valor ${index + 1}`}</h1>
                <Input
                  className="bg-white"
                  label={`Valor in-game ${index + 1}`}
                  crossOrigin={''}
                  type="text"
                  value={inGameValue}
                  onChange={(e) => {
                    const newInputData = [...inputData]
                    newInputData[index].inGameValue = e.target.value
                    setInputData(newInputData)
                  }}
                  required
                />
                <Input
                  label={`Valor real ${index + 1}`}
                  className="bg-white"
                  crossOrigin={''}
                  type="text"
                  value={realValue}
                  onChange={(e) => {
                    const newInputData = [...inputData]
                    if (isNaN(Number(e.target.value))) {
                      newInputData[index].realValue = ''
                    } else {
                      newInputData[index].realValue = e.target.value
                      setInputData(newInputData)
                    }
                  }}
                  required
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
