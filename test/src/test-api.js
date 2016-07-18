import FacebookAdsApi from './../../src/api'
import { should } from 'chai'
should()

describe('FacebookAdsApi', () => {
  it('should hold a a default instance', () => {
    const api = FacebookAdsApi.init('token')
    FacebookAdsApi.getDefaultApi().should.be.equal(api)
  })

  it('should encode params', () => {
    const params = {
      'a': 'b',
      'c': [1, 2],
      'd': {e: 'f'},
      'g': [{e: 'f'}]
    }
    const query = FacebookAdsApi._encodeParams(params)
    query.should.be.equal('a=b&c=%5B1%2C2%5D&d=%7B%22e%22%3A%22f%22%7D&g=%5B%7B%22e%22%3A%22f%22%7D%5D')
  })
})
