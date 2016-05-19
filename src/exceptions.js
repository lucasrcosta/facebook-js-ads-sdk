
export class FacebookError extends Error {
  constructor (error) {
    super(error.message)
    this.name = 'FacebookError'
  }
}

export class FacebookRequestError extends FacebookError {
  constructor (error) {
    super(error.message)
    this.name = 'FacebookRequestError'
    this.message = error.message
    this.type = error.type
    this.code = error.code
    this.fbtrace_id = error.fbtrace_id
  }
}

