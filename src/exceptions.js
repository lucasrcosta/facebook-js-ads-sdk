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
    super(error.message)
    this.name = 'FacebookRequestError'
    this.message = error.message
    this.status = response.status
    this.response = response.body
    this.method = method
    this.url = url
    if (data) this.data = data
  }
}
