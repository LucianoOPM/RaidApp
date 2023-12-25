import { Button, Input } from '@material-tailwind/react'
import HelpIcon from '@renderer/assets/HelpIcon'
import { ChangeEvent, useState, MouseEvent, FC } from 'react'
import { inputs } from './inputs'
import { NewCriteriaPoint } from '@renderer/types/criterias.types'
import Swal from 'sweetalert2'

interface CriteriasFormProps {
  setRegister: () => void
}
const initialValue: NewCriteriaPoint = {
  name: ''
}

const CriteriasForm: FC<CriteriasFormProps> = ({ setRegister }): JSX.Element => {
  const [hideStyle, setHideStyle] = useState(inputs)
  const [critValues, setCritValues] = useState<NewCriteriaPoint>(initialValue)

  const handleHover = (id: number): void => {
    setHideStyle((prevHideStyle) =>
      prevHideStyle.map((input) => {
        if (input.idInput === id) {
          return {
            ...input,
            spanStyle: 'text-gray-800 absolute right'
          }
        } else {
          return input
        }
      })
    )
  }

  const handleLeft = (id: number): void => {
    setHideStyle((prevHideStyle) =>
      prevHideStyle.map((input) => {
        if (input.idInput === id) {
          return {
            ...input,
            spanStyle: 'hidden text-gray-800 absolute right'
          }
        } else {
          return input
        }
      })
    )
  }

  const handleValues = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setCritValues({ ...critValues, [name]: value })
  }

  const handleSave = async (e: MouseEvent): Promise<void> => {
    e.preventDefault()
    const save = await window.api.saveCriteria(critValues)
    setCritValues(initialValue)
    if (save) {
      if ('payload' in save) {
        console.log(save.payload)
        Swal.fire({
          title: 'Guardado',
          text: `${save.message}`
        })
        setRegister()
      } else {
        Swal.fire({
          title: 'Error',
          text: `${save.error}`
        })
      }
    }
  }

  return (
    <form className="mt-8 block space-y-4">
      {hideStyle.map(({ idInput, label, infoText, spanStyle, name, type }) => (
        <div className="flex justify-center w-full relative" key={idInput} id={`input-${idInput}`}>
          <div className="w-1/2">
            <Input
              type={type}
              name={name}
              value={critValues[name]}
              onChange={handleValues}
              className="bg-white"
              crossOrigin={''}
              label={label}
              icon={<HelpIcon onShow={handleHover} onHide={handleLeft} id={idInput} />}
            />
          </div>
          <div>
            <span className={spanStyle}>{infoText}</span>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <div className="w-1/2">
          <Button fullWidth placeholder={''} onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CriteriasForm
