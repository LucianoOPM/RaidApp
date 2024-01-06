interface User {
  idUser: number
  username: string
  register_date: Date
}

interface FrontendNewUser {
  username: string
  register_date: string
}

interface NewUser extends Omit<User, 'idUser'> {}
interface UpdateUser extends Omit<User, 'idUser'> {}

type Users = User[]

export type { User, Users, NewUser, UpdateUser, FrontendNewUser }
