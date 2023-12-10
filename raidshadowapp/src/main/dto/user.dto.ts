import { User } from '../types/user.type'

class UserDto {
  public username: string
  public registerDate: Date
  public role: number
  constructor(user: User) {
    this.username = user.username
    this.registerDate = user.register_date
    this.role = user.idRole
  }
}

export default UserDto
