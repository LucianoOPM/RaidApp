import { User } from '@renderer/types/user.types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserInformation = (): JSX.Element => {
  const { id } = useParams()
  const [user, setUser] = useState<User>()

  // useEffect(() => {
  //   const getUser = () => {}
  // })

  return <div>Informacion</div>
}

export default UserInformation
