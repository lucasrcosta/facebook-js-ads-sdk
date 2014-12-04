var path = require('path');
var expect = require('chai').expect;

var DataObject = require(path.join(__dirname, '../..', 'src/objects/data-object.js'));

describe('DataObject', function () {
  'use strict';

  describe("constructor", function() {
    it('exists', function () {
      expect(DataObject).to.be.a('function');
    });
  });
});