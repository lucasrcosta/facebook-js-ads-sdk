import { accessToken, accountId } from './config.json'
import FacebookAdsApi from './../../src/api'
import * as exc from './../../src/exceptions'
import * as obj from './../../src/objects'
import chai from 'chai'
chai.should()
var api
var campaign

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

describe('Graph Objects', function () {
  this.timeout(5000)

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

  it('should create an object on the graph', (done) => {
    const data = {
      [obj.Campaign.Fields.name]: 'Facebook JS Ads SDK Test',
      [obj.Campaign.Fields.status]: obj.Campaign.Status.paused
    }
    new obj.Campaign(data, accountId).create()
    .then((result) => {
      campaign = result
      campaign.id.should.be.ok
      done()
    })
    .catch(done)
  })

  it('should update an object from the graph', (done) => {
    campaign.name = 'Facebook JS Ads SDK Test Updated'
    campaign.update()
    .then((result) => {
      result.success.should.be.true
      done()
    })
    .catch(done)
  })

  it('should delete an object from the graph', (done) => {
    campaign.delete()
    .then((result) => {
      result.success.should.be.true
      done()
    })
    .catch(done)
  })
})
