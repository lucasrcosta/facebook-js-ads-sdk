import { ExtendableBuiltin } from './mixins'

export class FacebookError extends ExtendableBuiltin(Error) {
  constructor (error) {
    super(error.message)
    this.name = 'FacebookError'
  }
}

export class FacebookRequestError extends FacebookError {
  constructor (response, method, url, data) {
    let error = response.body.error
    let message = error.error_user_msg
      ? `${error.error_user_title}: ${error.error_user_msg}`
      : error.message
    super(message)
    this.name = 'FacebookRequestError'
    this.message = message
    this.status = response.status
    this.response = response.body
    this.method = method
    this.url = url
    if (data) this.data = data
  }
}
