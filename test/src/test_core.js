import { AbstractObject, AbstractCrudObject } from './../../src/core'
import { should } from 'chai'
should()

describe('AbstractObject', () => {
  class ConcreteObject extends AbstractObject {
  }
  ConcreteObject.fields = Object.freeze({ field: 'field' })

  it('should create a data object with getters and setters for fields', () => {
    const object = new ConcreteObject()
    const descriptor = Object.getOwnPropertyDescriptor(object, 'field')
    descriptor.get.should.be.a('function')
    descriptor.set.should.be.a('function')
    descriptor.enumerable.should.be.ok
  })

  it('should set a data field value', () => {
    const object = new ConcreteObject()
    object.set('field', 1)
    object._data.field.should.be.equal(1)
  })

  it('should set an extra data field value', () => {
    const object = new ConcreteObject()
    object.set('field', 1)
    object._data.field.should.be.equal(1)
  })

  it('should chain the set method', () => {
    const object = new ConcreteObject()
    object.set('field', 1).should.be.equal(object)
  })

  it('should set multiple data fields', () => {
    const object = new ConcreteObject()
    object.setData({field: 1, extrafield: 2})
    object.field.should.be.equal(1)
    object.extrafield.should.be.equal(2)
  })

  it('should chain the setData method', () => {
    const object = new ConcreteObject()
    object.setData({field: 1}).should.be.equal(object)
  })

  it('should set initial data', () => {
    const data = {field: 1, extrafield: 2}
    const object = new ConcreteObject(data)
    object.exportData().should.be.eql(data)
  })

  it('should export data', () => {
    const data = {field: 1, extrafield: 2}
    const object = new ConcreteObject()
    object.setData(data)
    object.exportData().should.be.eql(data)
  })
})

describe('AbstractCrudObject', () => {
  class ConcreteCrudObject extends AbstractCrudObject {
  }
  ConcreteCrudObject.fields = Object.freeze({ field: 'field' })

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

