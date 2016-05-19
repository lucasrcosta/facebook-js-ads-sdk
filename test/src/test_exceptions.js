import * as exc from './../../src/exceptions'
import { should } from 'chai'
should()

describe('Exceptions', () => {
  it('should be checked with instanceof', () => {
    let error = new exc.FacebookRequestError({
      body: { error: { message: 'Unsupported get request' } }
    })
    error.should.be.an.instanceof(Error)
    error.should.be.an.instanceof(exc.FacebookRequestError)
  })
})
