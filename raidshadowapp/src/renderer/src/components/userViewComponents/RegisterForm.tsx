import { ChangeEvent, FormEvent, useState, FC } from 'react'
import { NewUser } from '@renderer/types/user.types'
import { Button } from '@nextui-org/react'

interface RegisterFormProps {
  registerHook: () => void
}

const RegisterForm: FC<RegisterFormProps> = ({ registerHook }): JSX.Element => {
  const currentDate = new Date()
  const dateString = currentDate.toISOString().split('T')[0]

  const [dateValue, setDateValue] = useState<string>(dateString)
  const [optSelected, setOptSelected] = useState('0')
  const [username, setUsername] = useState('')

  const handleOptions = (event: ChangeEvent<HTMLSelectElement>): void => {
    setOptSelected(event.target.value)
  }

  const handleUsername = (event: FormEvent<HTMLInputElement>): void => {
    setUsername(event.currentTarget.value)
  }

  const handleDate = (event: FormEvent<HTMLInputElement>): void => {
    setDateValue(event.currentTarget.value)
  }

  const handleRegister = async (event: FormEvent<HTMLButtonElement>): Promise<void> => {
    try {
      event.preventDefault()

      const newUser: NewUser = {
        username,
        idRole: +optSelected,
        register_date: new Date(dateValue)
      }
      const result = await window.api.createUser(newUser)
      if (result.code !== 201) {
        throw new Error('Error al crear el usuario')
      }
      alert('Usuario creado correctamente')
      registerHook()
      setUsername('')
      setOptSelected('0')
      setDateValue(dateValue)
    } catch (error) {
      alert('Error al crear el usuario')
    }
  }

  return (
    <div>
      <div className="text-center w-1/2 mt-8 mx-auto">
        <div className="relative h-10 w-full min-w-[200px]">
          <input
            value={username}
            onInput={handleUsername}
            className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-purple-400 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-purple-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Username
          </label>
        </div>
      </div>
      <div className="text-center">
        <input
          id="registerDate"
          className="mt-2 bg-white mb-2 h-10 w-1/2 min-w-[200px] rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
          placeholder=" "
          type="date"
          value={dateValue}
          onChange={handleDate}
        />
      </div>
      <div className="text-center">
        <div className="mx-auto">
          <select
            id="rangos"
            value={optSelected}
            onChange={handleOptions}
            className="px-3 py-2 bg-white border border-blue-gray-200 rounded-md shadow-sm w-1/2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            name="rangos"
          >
            <option disabled value="0">
              Seleccionar rol
            </option>
            <option value="1">Lider</option>
            <option value="2">Lugarteniente</option>
            <option value="3">Soldado</option>
          </select>
        </div>
      </div>
      <div className="text-center">
        <Button className="mt-2" color="secondary" variant="ghost" onClick={handleRegister}>
          Registrar
        </Button>
      </div>
    </div>
  )
}

export default RegisterForm