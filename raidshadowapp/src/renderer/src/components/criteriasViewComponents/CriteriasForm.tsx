import { Input } from '@material-tailwind/react'
import HelpIcon from '@renderer/assets/HelpIcon'
import { useState } from 'react'

const inputs = [
  {
    idInput: 1,
    label: 'Criteria name',
    infoText: 'Ingrese el nombre de la criteria de evaluación',
    spanStyle: 'hidden text-gray-800 absolute right'
  },
  {
    idInput: 2,
    label: 'Puntos ingame',
    infoText: 'Coloque las puntuaciones como se visualizan en el juego, Ejemplo: 25k,50k,70k',
    spanStyle: 'hidden text-gray-800 absolute right'
  }
]

const CriteriasForm = (): JSX.Element => {
  const [hideStyle, setHideStyle] = useState(inputs)

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

  return (
    <form className="mt-8 block space-y-4">
      {hideStyle.map(({ idInput, label, infoText, spanStyle }) => (
        <div className="flex justify-center w-full relative" key={idInput} id={`input-${idInput}`}>
          <div className="w-1/2">
            <Input
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
    </form>
  )
}

export default CriteriasForm
