import AbstractCrudObject from './../../../src/objects/core/abstract_crud_object'
import { should } from 'chai'
should()

describe('AbstractCrudObject', () => {
  class ConcreteCrudObject extends AbstractCrudObject {
    static get fields () {
      return Object.freeze({ field: 'field' })
    }
    constructor (data = {}) {
      super(ConcreteCrudObject.fields, data)
    }
  }

  it('should store changes for field properties', () => {
    const object = new ConcreteCrudObject()
    object.field = 3
    object._changes.field.should.be.equal(3)
  })

  it('should set data wiping change history', () => {
    const object = new ConcreteCrudObject()
    object.field = 3
    object.setData({'field': 3})
    object.exportData().should.be.eql({})
  })

  it('should export changed data', () => {
    const object = new ConcreteCrudObject()
    object.field = 3
    object.exportData().should.be.eql({'field': 3})
  })

  it('should clear change history', () => {
    const object = new ConcreteCrudObject()
    object.field = 3
    object.clearHistory()
    object.exportData().should.be.eql({})
  })
})
