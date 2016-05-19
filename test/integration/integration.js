import { accessToken, businessId } from './config.json'
import FacebookAdsApi from './../../src/api'
import * as obj from './../../src/objects'
import chai from 'chai'
chai.should()

before(() => {
  FacebookAdsApi.init(accessToken)
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
