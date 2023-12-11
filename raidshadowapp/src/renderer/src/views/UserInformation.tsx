import PointsForm from '@renderer/components/userViewComponents/PointsForm'
import { User, UserDto, Users } from '@renderer/types/user.types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserInformation = (): JSX.Element => {
  const { id } = useParams()
  const [user, setUser] = useState<User | Users | UserDto>()
  const [error, setError] = useState('')

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const res = id && (await window.api.getUser(id))
      if (!res) {
        setError('No se pudo obtener el usuario')
      } else {
        if ('payload' in res) {
          setUser(res.payload)
        } else {
          setError('No se pudo obtener el usuario')
        }
      }
    }
    getUser()
  }, [])

  console.log(error)
  console.log(user)

  return (
    <div>
      <PointsForm></PointsForm>
    </div>
  )
}

export default UserInformation
