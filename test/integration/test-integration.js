import chai from 'chai'
import FacebookAdsApi from './../../src/api'
import { accessToken, accountId } from './config.json'
import { FacebookRequestError } from './../../src/exceptions'
import AdAccount from './../../src/objects/ad-account'
import Campaign from './../../src/objects/campaign'

var api
var account
var campaign

chai.should()

before(() => {
  api = FacebookAdsApi.init(accessToken).setDebug(true)
  if (!accountId.startsWith('act_')) throw new Error('accountId should start with "act_"')
})

describe('Api', () => {
  it('should reject requests with FacebookRequestError', (done) => {
    api.call('GET', [''])
    .then(() => { throw new Error('Promise should have been rejected') })
    .catch((error) => {
      error.should.be.an.instanceof(FacebookRequestError)
      done()
    })
    .catch(done)
  })
})

describe('Graph Objects', function () {
  this.timeout(5000)

  it('should be read', (done) => {
    account = new AdAccount({'id': accountId})
    account.read([AdAccount.Fields.id, AdAccount.Fields.name])
    .then(() => {
      account.name.should.be.ok
      done()
    })
    .catch(done)
  })

  it('should be created', (done) => {
    const data = {
      [Campaign.Fields.name]: 'Facebook JS Ads SDK Test',
      [Campaign.Fields.status]: Campaign.Status.paused
    }
    new Campaign(data, accountId).save()
    .then((result) => {
      campaign = result
      campaign.id.should.be.ok
      done()
    })
    .catch(done)
  })

  it('should be updated', (done) => {
    campaign.name = 'Facebook JS Ads SDK Test Updated'
    campaign.save()
    .then((result) => {
      result.success.should.be.true
      done()
    })
    .catch(done)
  })

  it('should read their related objects', (done) => {
    account.getCampaigns([Campaign.Fields.name])
    .then((campaigns) => {
      campaigns.should.be.a('array').and.have.length.above(0)
      campaigns[0].should.be.an.instanceof(Campaign)
      campaigns[0].name.should.be.ok
      done()
    })
    .catch(done)
  })

  it('should be deleted', (done) => {
    campaign.delete()
    .then((result) => {
      result.success.should.be.true
      done()
    })
    .catch(done)
  })

  it('should be read by ids', (done) => {
    AdAccount.getByIds([accountId])
    .then((objects) => {
      objects.should.be.a('array').and.have.lengthOf(1)
      objects[0].should.be.an.instanceof(AdAccount)
      done()
    })
    .catch(done)
  })
})
