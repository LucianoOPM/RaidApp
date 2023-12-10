import { Users } from '@renderer/types/user.types'
import { Link } from 'react-router-dom'
import { useEffect, useState, FC } from 'react'
import { ErrorResponse, SuccessResponse } from '@renderer/types/response.types'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button
} from '@nextui-org/react'
import MoreInfo from '@renderer/assets/MoreInfoIcon'

interface UserTableProps {
  wasRegistered: boolean
}

const UserTable: FC<UserTableProps> = ({ wasRegistered }): JSX.Element => {
  const [users, setUsers] = useState<Users>([])
  const [error, setError] = useState<string>('')
  console.log(error)

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        const res: SuccessResponse | ErrorResponse = await window.api.getUsers()

        if ('payload' in res) {
          if (Array.isArray(res.payload)) {
            setUsers(res.payload)
          }
        } else {
          setError(res.error)
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
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Username</TableColumn>
            <TableColumn>Fecha de registro</TableColumn>
            <TableColumn>Puntuación del mes</TableColumn>
            <TableColumn width={1}>Más información</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.idUser}>
                  <TableCell>{user.idUser}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.register_date.toISOString().split('T')[0]}</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell>
                    <Link to={`/user/${user.idUser}`} state={user.idUser}>
                      <Button
                        isIconOnly
                        color="warning"
                        variant="light"
                        aria-label="more information"
                      >
                        <MoreInfo />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UserTable
