"use strict";

var _case_converter = require("./case_converter");

describe('utils/case_converter', function () {
  describe('.toCamelCaseDeep', function () {
    it('Should convert a plain object.', function () {
      var object = {
        property_1: '1',
        other_property: '2'
      };
      var converted = (0, _case_converter.toCamelCaseDeep)(object);
      expect(converted).to.eql({
        property1: '1',
        otherProperty: '2'
      });
    });
    it('Should convert nested objects.', function () {
      var object = {
        some_property_1: {
          some_property_2: {
            some_property_3: '3'
          }
        }
      };
      var converted = (0, _case_converter.toCamelCaseDeep)(object);
      expect(converted).to.eql({
        someProperty1: {
          someProperty2: {
            someProperty3: '3'
          }
        }
      });
    });
    it('Should convert array elements.', function () {
      var object = {
        some_array: [{
          element_1: 1
        }, {
          element_2: 2
        }]
      };
      var converted = (0, _case_converter.toCamelCaseDeep)(object);
      expect(converted).to.eql({
        someArray: [{
          element1: 1
        }, {
          element2: 2
        }]
      });
    });
    it('Should convert array of numbers', function () {
      var object = {
        some_array: [1, 2, 4]
      };
      var converted = (0, _case_converter.toCamelCaseDeep)(object);
      expect(converted).to.eql({
        someArray: [1, 2, 4]
      });
    });
    it('Should convert an array.', function () {
      var object = [{
        element_1: 1
      }, {
        element_2: 2
      }];
      var converted = (0, _case_converter.toCamelCaseDeep)(object);
      expect(converted).to.eql([{
        element1: 1
      }, {
        element2: 2
      }]);
    });
  });
  describe('.toSnakeCaseDeep', function () {
    it('Should convert a plain object.', function () {
      var object = {
        property1: '1',
        otherProperty: '2'
      };
      var converted = (0, _case_converter.toSnakeCaseDeep)(object);
      expect(converted).to.eql({
        property_1: '1',
        other_property: '2'
      });
    });
    it('Should convert nested objects.', function () {
      var object = {
        someProperty1: {
          someProperty2: {
            someProperty3: '3'
          }
        }
      };
      var converted = (0, _case_converter.toSnakeCaseDeep)(object);
      expect(converted).to.eql({
        some_property_1: {
          some_property_2: {
            some_property_3: '3'
          }
        }
      });
    });
    it('Should convert array elements.', function () {
      var object = {
        someArray: [{
          element1: 1
        }, {
          element2: 2
        }]
      };
      var converted = (0, _case_converter.toSnakeCaseDeep)(object);
      expect(converted).to.eql({
        some_array: [{
          element_1: 1
        }, {
          element_2: 2
        }]
      });
    });
    it('Should convert an array.', function () {
      var object = [{
        element1: 1
      }, {
        element2: 2
      }];
      var converted = (0, _case_converter.toSnakeCaseDeep)(object);
      expect(converted).to.eql([{
        element_1: 1
      }, {
        element_2: 2
      }]);
    });
  });
});