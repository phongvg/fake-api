import USER_MESSAGES from '~/constants/messages'
import HTTP_STATUS from '~/constants/status'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
> // {[key, string]: string}
export class ErrrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrrorWithStatus {
  errors: ErrorsType
  constructor({ message = USER_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
