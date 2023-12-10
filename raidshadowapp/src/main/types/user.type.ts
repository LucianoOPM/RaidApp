interface User {
  idUser: number
  username: string
  register_date: Date
  idRole: number
}

interface NewUser extends Omit<User, 'idUser'> {}
interface UpdateUser extends Omit<User, 'idUser'> {
  username: string
  register_date: Date
  idRole: number
}

type Users = User[]

export type { User, Users, NewUser, UpdateUser }
