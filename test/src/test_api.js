import FacebookAdsApi from './../../src/api'
import { should } from 'chai'
should()

describe('FacebookAdsApi', () => {
  it('should hold a a default instance', () => {
    const api = FacebookAdsApi.init('token')
    FacebookAdsApi.getDefaultApi().should.be.equal(api)
  })
})
