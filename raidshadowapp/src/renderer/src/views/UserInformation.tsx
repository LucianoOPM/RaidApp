import PointsForm from '@renderer/components/userViewComponents/PointsForm'
import { User } from '@renderer/types/user.types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const UserInformation = (): JSX.Element => {
  const { id } = useParams()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const res = id && (await window.api.getUser(id))
      if (!res) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener el usuario',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      } else {
        if ('payload' in res) {
          const data = JSON.parse(res.payload)
          setUser(data)
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo obtener el usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      }
    }
    getUser()
  }, [])

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <span>
          Información del usuario <strong>{user?.username}</strong>
        </span>
      </div>
      <div>
        <PointsForm></PointsForm>
      </div>
    </div>
  )
}

export default UserInformation
