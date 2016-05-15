import AbstractObject from './../../../src/objects/core/abstract_object'
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
