import { accessToken, accountId } from './config.json'
import FacebookAdsApi from './../../src/api'
import * as exc from './../../src/exceptions'
import * as obj from './../../src/objects'
import chai from 'chai'
chai.should()
var api

before(() => {
  api = FacebookAdsApi.init(accessToken).setDebug(true)
  if (!accountId.startsWith('act_')) throw new Error('accountId should start with "act_"')
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

describe('Graph Objects', () => {
  it('should read by ids', (done) => {
    obj.AdAccount.getByIds([accountId])
    .then((objects) => {
      objects.should.be.a('array').and.have.lengthOf(1)
      objects[0].should.be.an.instanceof(obj.AdAccount)
      done()
    })
    .catch(done)
  })

  it('should read an object from the graph', (done) => {
    const account = new obj.AdAccount({'id': accountId})
    account.read([obj.AdAccount.Fields.id, obj.AdAccount.Fields.name])
    .then(() => {
      account.name.should.be.ok
      done()
    })
    .catch(done)
  })
})
