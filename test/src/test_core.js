import { AbstractObject, AbstractCrudObject, Cursor } from './../../src/core'
import chai from 'chai'
chai.should()

describe('AbstractObject', () => {
  class ConcreteObject extends AbstractObject {
    static get Fields () { return Object.freeze({ field: 'field' }) }
  }

  it('should possess a Fields enum', () => {
    ;() => (new AbstractObject()).should.throw(Error)
    ;() => (ConcreteObject.Fields = {}).should.throw(TypeError)
    ;() => (ConcreteObject.Fields.field = '').should.throw(TypeError)
    ConcreteObject.Fields.field.should.be.equal('field')
  })

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

  it('should set data', () => {
    const data = {field: 1, extrafield: 2}
    const object = new ConcreteObject().setData(data)
    object.exportData().should.be.eql(data)
  })

  it('should chain the setData method', () => {
    const object = new ConcreteObject()
    object.setData({field: 1}).should.be.equal(object)
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
    static get Fields () { return Object.freeze({ field: 'field' }) }
  }

  it('should store changes for field properties', () => {
    const object = new ConcreteCrudObject({'field': 3})
    object.set('extraField', 4)
    object._changes.should.be.eql({field: 3, extraField: 4})
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

describe('Cursor', () => {
  const callStub = (method, url) => {
    return new Promise((resolve, reject) => {
      if (url === '[nextUrl]') {
        resolve({
          data: [4, 5, 6],
          paging: {
            cursors: {
              before: '[beforeCursor]',
              after: '[afterCursor]'
            },
            previous: '[previousUrl]'
          },
          summary: { total_count: 6 }
        })
      } else {
        resolve({
          data: [1, 2, 3],
          paging: {
            cursors: {
              before: '[beforeCursor]',
              after: '[afterCursor]'
            },
            next: '[nextUrl]'
          },
          summary: { total_count: 6 }
        })
      }
    })
  }
  const sourceObject = { getId: () => 'id', getApi: () => ({call: callStub}) }
  class targetClass {
    constructor (num) { this.v = num }
    static get Fields () {}
    static getEndpoint () { 'endpoint' }
  }

  it('should clear data', () => {
    const cursor = new Cursor(sourceObject, targetClass)
    cursor.push(1, 2, 3)
    cursor.clear()
    cursor.length.should.be.equal(0)
  })

  it('should set data', () => {
    const cursor = new Cursor(sourceObject, targetClass)
    const data = [1, 2, 3]
    cursor.set(data)
    cursor.length.should.be.equal(3)
    ;[...cursor].should.be.eql(data)
  })

  it('should load next and previous pages', (done) => {
    const cursor = new Cursor(sourceObject, targetClass)
    cursor.hasNext().should.be.true
    cursor.next()
    .then(() => {
      ;[...cursor].should.be.eql([{v: 1}, {v: 2}, {v: 3}])
      cursor.hasNext().should.be.true
      cursor.hasPrevious().should.be.false
      cursor.paging.next.should.be.eql('[nextUrl]')
      return cursor.next()
    })
    .then(() => {
      ;[...cursor].should.be.eql([{v: 4}, {v: 5}, {v: 6}])
      cursor.hasNext().should.be.false
      cursor.hasPrevious().should.be.true
      return cursor.next()
    })
    .catch((error) => {
      if (error instanceof chai.AssertionError) throw error
      error.should.be.an.instanceof(RangeError)
      return cursor.previous()
    })
    .then(() => {
      ;[...cursor].should.be.eql([{v: 1}, {v: 2}, {v: 3}])
      cursor.hasNext().should.be.true
      cursor.hasPrevious().should.be.false
      return cursor.previous()
    })
    .catch((error) => {
      if (error instanceof chai.AssertionError) throw error
      error.should.be.an.instanceof(RangeError)
      done()
    })
    .catch(done)
  })
})
