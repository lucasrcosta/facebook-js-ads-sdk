import AbstractObject from './../../../src/objects/core/abstract_object'
import { should } from 'chai'
should()

describe('AbstractObject', () => {
  class ConcreteObject extends AbstractObject {
    static get fields () {
      return Object.freeze({
        field: 'field',
        field2: 'field2'
      })
    }
    constructor (data = {}) {
      super(ConcreteObject.fields, data)
    }
  }

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

  it('set method should be chainable', () => {
    const object = new ConcreteObject()
    object.set('field', 1).should.be.equal(object)
  })

  it('should throw an error when setting an unregistered field', () => {
    (() => {
      const object = new ConcreteObject()
      object.set('c', 1)
    }).should.throw(Error)
  })

  it('should set multiple data fields values', () => {
    const object = new ConcreteObject()
    object.setData({field: 1, field2: 2})
    object.field.should.be.equal(1)
    object.field2.should.be.equal(2)
  })

  it('setData method should be chainable', () => {
    const object = new ConcreteObject()
    object.setData({field: 1, field2: 2}).should.be.equal(object)
  })

  it('should export data', () => {
    const data = {field: 1, field2: 2}
    const object = new ConcreteObject()
    object.setData(data)
    object.exportData().should.be.eql(data)
  })

  it('should set initial data', () => {
    const data = {field: 1, field2: 2}
    const object = new ConcreteObject(data)
    object.exportData().should.be.eql(data)
  })
})
