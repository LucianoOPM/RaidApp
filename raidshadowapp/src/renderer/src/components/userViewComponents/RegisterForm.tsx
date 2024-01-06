import { FormEvent, useState, FC, ChangeEvent } from 'react'
import { NewUser } from '@renderer/types/user.types'
import { Button, Input } from '@material-tailwind/react'
import swal from 'sweetalert2'

interface RegisterFormProps {
  registerHook: () => void
}
const currentDate = new Date()
const dateString = currentDate.toISOString().split('T')[0]
const initialValues: NewUser = {
  username: '',
  register_date: dateString
}

const RegisterForm: FC<RegisterFormProps> = ({ registerHook }): JSX.Element => {
  const [userValues, setUserValues] = useState<NewUser>(initialValues)
  const formFields = [
    {
      idInput: 1,
      label: 'Nombre de usuario',
      type: 'text',
      name: 'username'
    },
    {
      idInput: 2,
      label: 'Fecha del registro',
      type: 'date',
      name: 'register_date'
    }
  ]

  const handleValues = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUserValues({ ...userValues, [name]: value })
  }

  const resetValues = (e?: FormEvent<HTMLButtonElement>): void => {
    if (e) {
      e.preventDefault()
    }
    setUserValues(initialValues)
  }

  const handleRegister = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    const { username, register_date } = userValues
    const saveUser = async (): Promise<void> => {
      try {
        const res = await window.api.createUser({ username, register_date })
        if (res.code === 201) {
          swal.fire({
            title: 'Guardado',
            text: `${'message' in res ? res.message : ''}`
          })
          resetValues()
          registerHook()
        }
        if (res.code !== 201) {
          swal.fire({
            title: 'Error',
            text: `${'error' in res ? res.error : 'Error desconocido'}`
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    saveUser()
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="w-1/2 text-center">
        <form>
          <div className="space-y-4 mb-4">
            {formFields.map(({ name, label, type }, index) => {
              return (
                <Input
                  className="bg-white"
                  value={userValues[name]}
                  name={name}
                  key={index}
                  label={label}
                  type={type}
                  crossOrigin={''}
                  onChange={handleValues}
                />
              )
            })}
          </div>
          <div className="space-x-4">
            <Button placeholder={''} onClick={handleRegister}>
              Guardar
            </Button>
            <Button placeholder={''} onClick={resetValues}>
              Reiniciar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
