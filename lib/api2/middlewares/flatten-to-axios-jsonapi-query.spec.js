"use strict";

var _flattenToAxiosJsonapiQuery = require("./flatten-to-axios-jsonapi-query");

describe('flattenToAxiosJsonApiQuery', function () {
  it('should not modify object with primitive query parameters', function () {
    var query = {
      foo: 'bar',
      fizz: 'buzz'
    };
    var result = (0, _flattenToAxiosJsonapiQuery.flattenToAxiosJsonApiQuery)({
      params: query
    });
    expect(result.params).to.deep.equal(query);
  });
  it('should properly modify object with array params', function () {
    var query = {
      param: ['fizz', 'bar', 'buzz'],
      param2: ['abc', 123, 'qqq']
    };
    var result = (0, _flattenToAxiosJsonapiQuery.flattenToAxiosJsonApiQuery)({
      params: query
    });
    expect(result.params).to.deep.equal({
      param: 'fizz,bar,buzz',
      param2: 'abc,123,qqq'
    });
  });
  it('should properly modify object with object params', function () {
    var query = {
      filter: {
        first_name: 'John',
        min_age: 25
      },
      page: {
        number: 2,
        limit: 15
      }
    };
    var result = (0, _flattenToAxiosJsonapiQuery.flattenToAxiosJsonApiQuery)({
      params: query
    });
    expect(result.params).to.deep.equal({
      'filter[first_name]': 'John',
      'filter[min_age]': 25,
      'page[number]': 2,
      'page[limit]': 15
    });
  });
  it('should throw the proper error when query has nested array param', function () {
    var query = {
      param: [1, 2, [3, 4]]
    };
    expect(function () {
      return (0, _flattenToAxiosJsonapiQuery.flattenToAxiosJsonApiQuery)({
        params: query
      });
    }).to.throw('Nested arrays or objects are not allowed for using in query params');
  });
  it('should throw the proper error when query has nested object param', function () {
    var query = {
      param: {
        nestedParam: {
          key: 'value'
        }
      }
    };
    expect(function () {
      return (0, _flattenToAxiosJsonapiQuery.flattenToAxiosJsonApiQuery)({
        params: query
      });
    }).to.throw('Nested arrays or objects are not allowed for using in query params');
  });
});