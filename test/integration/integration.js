import { accessToken, businessId } from './config.json'
import FacebookAdsApi from './../../src/api'
import * as exc from './../../src/exceptions'
import * as obj from './../../src/objects'
import chai from 'chai'
chai.should()
var api

before(() => {
  api = FacebookAdsApi.init(accessToken)
})

describe('Api', () => {
  it('should reject requests with FacebookRequestError', (done) => {
    api.call('GET', [''])
    .then(() => { throw new Error('Promise should have been rejected') })
    .catch((error) => {
      error.should.be.an.instanceof(exc.FacebookRequestError)
      done()
    })
    .catch(done)
  })
})

describe('AbstractCrudObject', () => {
  it('should read by ids', (done) => {
    obj.Business.getByIds([businessId])
    .then((objects) => {
      objects.should.be.a('array').and.have.lengthOf(1)
      objects[0].should.be.an.instanceof(obj.Business)
      done()
    })
    .catch(done)
  })
})
