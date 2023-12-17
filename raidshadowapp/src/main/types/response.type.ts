enum ResponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  CREATED = 201
}

interface Response {
  code: ResponseCode
}

interface SuccessResponse extends Response {
  message: string
  payload: string
}

interface ErrorResponse extends Response {
  error: string
}

export type { SuccessResponse, ErrorResponse, ResponseCode }
