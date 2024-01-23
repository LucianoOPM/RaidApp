import { User } from '../types/user.type'

class UserDto {
  public username: string
  public registerDate: Date
  constructor(user: User) {
    this.username = user.username
    this.registerDate = user.register_date
  }
}

export default UserDto
