import { User, Users, UserDto } from './user.types'

interface Response {
  code: 200 | 404 | 201 | 500 | 400
}

interface ErrorResponse extends Response {
  error: string
}
interface SuccessResponse extends Response {
  message: string
  payload: Users | User | UserDto
}

export type { ErrorResponse, SuccessResponse }
