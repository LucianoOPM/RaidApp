import { Users } from '@renderer/types/user.types'
import { Link } from 'react-router-dom'
import { useEffect, useState, FC } from 'react'
import { Card, Typography, Button } from '@material-tailwind/react'
import MoreInfo from '@renderer/assets/MoreInfoIcon'

interface UserTableProps {
  wasRegistered: boolean
}

const thValues = ['ID', 'Username', 'Fecha de registro', 'Puntuación del mes', 'Más información']

const UserTable: FC<UserTableProps> = ({ wasRegistered }): JSX.Element => {
  const [users, setUsers] = useState<Users>([])
  const [error, setError] = useState<string>('')
  console.log(error)

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        const res = await window.api.getUsers()

        if (!res) {
          setError('No se pudo obtener los usuarios')
        }
        if ('payload' in res) {
          const data = JSON.parse(res.payload)
          setUsers(data)
        } else {
          setError('No se pudo obtener los usuarios')
        }
      } catch (error) {
        setError('No se pudo obtener los usuarios')
      }
    }
    getUsers()
  }, [wasRegistered])

  return (
    <div className="flex justify-center">
      <div className="w-1/2 mt-20 font-bold">
        <Card className="h-full w-full" placeholder={''}>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {thValues.map((value, index) => {
                  return (
                    <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        placeholder={''}
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {value}
                      </Typography>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const isLast = users.length - 1 === index
                const styles = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
                return (
                  <tr key={user.idUser}>
                    <td className={styles}>
                      <Typography placeholder={''}>{user.idUser}</Typography>
                    </td>
                    <td className={`${styles}  bg-blue-gray-50/50`}>
                      <Typography placeholder={''}>{user.username}</Typography>
                    </td>
                    <td className={styles}>
                      <Typography placeholder={''}>{user.register_date.split('T')[0]}</Typography>
                    </td>
                    <td className={`${styles} bg-blue-gray-50/50`}>
                      <Typography placeholder={''}>8</Typography>
                    </td>
                    <td className={styles}>
                      <Typography placeholder={''}>
                        <Link to={`/user/${user.idUser}`} state={user.idUser}>
                          <Button placeholder={''}>
                            <MoreInfo />
                          </Button>
                        </Link>
                      </Typography>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}

export default UserTable
