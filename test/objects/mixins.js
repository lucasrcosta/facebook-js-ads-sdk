if (typeof require === 'function') {
  var srcPath = (typeof define === 'function' && define.amd) ? './../src/' : './../../src/';
  var CrudObject = require(srcPath + 'objects/core/crud-object');
  var CannotCreate = require(srcPath + 'objects/mixins/cannot-create');
  var CannotUpdate = require(srcPath + 'objects/mixins/cannot-update');
  var CannotDelete = require(srcPath + 'objects/mixins/cannot-delete');
  var ObjectValidation = require(srcPath + 'objects/mixins/object-validation');
  var Archivable = require(srcPath + 'objects/mixins/archivable');
  var chai = require('chai');
  var sinon = require('sinon');
  chai.should();
} else {
  var CrudObject = FbApiAssets.Objects.Core.CrudObject;
  var CannotCreate = FbApiAssets.Objects.Mixins.CannotCreate;
  var CannotUpdate = FbApiAssets.Objects.Mixins.CannotUpdate;
  var CannotDelete = FbApiAssets.Objects.Mixins.CannotDelete;
  var ObjectValidation = FbApiAssets.Objects.Mixins.ObjectValidation;
  var Archivable = FbApiAssets.Objects.Mixins.Archivable;
}

describe('Mixins', function() {
  'use strict';

  describe('CannotCreate', function() {

    it('augmented object can\'t create an object', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      CannotCreate.call(crudObj);
      crudObj.create.should.throw('Object cannot be created');
    });

  });

  describe('CannotUpdate', function() {

    it('augmented object can\'t update an object', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      CannotUpdate.call(crudObj);
      crudObj.update.should.throw('Object cannot be updated');
    });

  });

  describe('CannotDelete', function() {

    it('augmented object can\'t delete an object', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      CannotDelete.call(crudObj);
      crudObj.delete.should.throw('Object cannot be deleted');
    });

  });

  describe('ObjectValidation', function() {

    it('augmented object can be validated', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      ObjectValidation.call(crudObj);
      crudObj.validate.should.be.a('function');
    });

    it('augmented object validates with execution_options and additional params', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      ObjectValidation.call(crudObj);
      var crudSave = sinon.stub(crudObj, 'save');
      crudObj.validate({param: 1});
      crudSave.should.have.been.calledWith({param: 1, execution_options: ['validate_only']});
    });

  });

  describe('Archivable', function() {

    it('augmented object can be archived', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      Archivable.call(crudObj);
      crudObj.archive.should.be.a('function');
    });

    it('augmented object archives with additional params', function() {
      var crudObj = new CrudObject({}, 'endpoint', ['id']);
      var statusFieldName = 'obj_status';
      Archivable.call(crudObj, statusFieldName);
      var crudUpdate = sinon.stub(crudObj, 'update');
      var params = {param: 1};
      crudObj.update(params);
      var requestData = params;
      requestData[statusFieldName] = 'ARCHIVED';
      crudUpdate.should.have.been.calledWith(requestData);
    });

  });

});
