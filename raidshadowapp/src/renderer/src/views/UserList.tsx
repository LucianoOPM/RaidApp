import RegisterForm from '@renderer/components/userViewComponents/RegisterForm'
import UserTable from '@renderer/components/userViewComponents/UserTable'
import { useState } from 'react'

const UserList = (): JSX.Element => {
  const [registered, setRegistered] = useState(false)

  const handleRegistered = (): void => {
    setRegistered(true)
  }
  return (
    <div>
      <RegisterForm registerHook={handleRegistered} />
      <UserTable wasRegistered={registered} />
    </div>
  )
}

export default UserList
