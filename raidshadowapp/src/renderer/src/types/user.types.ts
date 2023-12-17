interface User {
  idUser: number
  username: string
  register_date: string
}

interface UserDto {
  username: string
  registerDate: string
  role: number
}

interface NewUser extends Omit<User, 'idUser'> {}
interface UpdateUser extends Omit<User, 'idUser'> {
  username: string
  register_date: string
}

type Users = User[]

export type { User, Users, NewUser, UpdateUser, UserDto }
