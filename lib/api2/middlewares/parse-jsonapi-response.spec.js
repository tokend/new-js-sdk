"use strict";

var _parseJsonapiResponse = require("./parse-jsonapi-response");

describe('parseJsonapiResponse', function () {
  it('should properly deserialize the response data', function () {
    var rawResponse = {
      status: 200,
      headers: {},
      data: {
        links: {
          prev: '',
          self: '/articles/1',
          next: '/articles/2'
        },
        data: [{
          type: 'articles',
          id: '1',
          attributes: {
            title: 'foo',
            text: 'bar'
          },
          relationships: {
            author: {
              data: {
                type: 'authors',
                id: 1
              }
            },
            category: {
              links: {
                self: '/articles/relationships/category/2'
              },
              data: {
                type: 'categories',
                id: 2
              }
            }
          }
        }],
        included: [{
          id: 1,
          type: 'authors',
          attributes: {
            first_name: 'John',
            last_name: 'Doe',
            age: 45
          },
          relationships: {
            comments: {
              data: [{
                type: 'comments',
                id: 23
              }, {
                type: 'comments',
                id: 22
              }]
            },
            book: {
              data: {
                type: 'books',
                id: 44
              }
            }
          }
        }, {
          type: 'books',
          id: 44,
          attributes: {
            title: 'Adventures',
            year: '2005'
          }
        }, {
          type: 'comments',
          id: 23,
          attributes: {
            title: 'Comment #23',
            message: 'Hello world',
            created_at: '2018-10-10T12:40:44Z'
          }
        }, {
          type: 'comments',
          id: 22,
          attributes: {
            title: 'Comment #22',
            message: 'Some message',
            created_at: '2016-02-04T11:00:50Z'
          }
        }]
      }
    };
    var result = (0, _parseJsonapiResponse.parseJsonapiResponse)(rawResponse);
    expect(result).to.have.property('data').deep.equal([{
      id: '1',
      type: 'articles',
      title: 'foo',
      text: 'bar',
      relationshipNames: ['author', 'category'],
      category: {
        type: 'categories',
        id: 2
      },
      author: {
        id: 1,
        type: 'authors',
        firstName: 'John',
        lastName: 'Doe',
        age: 45,
        relationshipNames: ['comments', 'book'],
        book: {
          type: 'books',
          id: 44,
          title: 'Adventures',
          year: '2005'
        },
        comments: [{
          type: 'comments',
          id: 23,
          title: 'Comment #23',
          message: 'Hello world',
          createdAt: '2018-10-10T12:40:44Z'
        }, {
          type: 'comments',
          id: 22,
          title: 'Comment #22',
          message: 'Some message',
          createdAt: '2016-02-04T11:00:50Z'
        }]
      }
    }]);
    expect(result).to.have.property('links').deep.equal({
      prev: '',
      self: '/articles/1',
      next: '/articles/2'
    });
  });
});