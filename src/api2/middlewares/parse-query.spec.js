import { parseQuery } from './parse-query'

describe('parseQuery', () => {
  it('should not modify object with primitive query parameters', () => {
    const query = {
      foo: 'bar',
      fizz: 'buzz'
    }

    const result = parseQuery(query)

    expect(result).to.deep.equal(query)
  })

  it('should properly modify object with array params', () => {
    const query = {
      param: ['fizz', 'bar', 'buzz'],
      param2: ['abc', 123, 'qqq']
    }

    const result = parseQuery(query)

    expect(result).to.deep.equal({
      param: 'fizz,bar,buzz',
      param2: 'abc,123,qqq'
    })
  })

  it('should properly modify object with object params', () => {
    const query = {
      filter: {
        first_name: 'John',
        min_age: 25
      },
      page: {
        number: 2,
        limit: 15
      }
    }

    const result = parseQuery(query)

    expect(result).to.deep.equal({
      'filter[first_name]': 'John',
      'filter[min_age]': 25,
      'page[number]': 2,
      'page[limit]': 15
    })
  })

  it('should throw the proper error when query has nested array param', () => {
    const query = {
      param: [1, 2, [3, 4]]
    }

    expect(() => parseQuery(query)).to.throw('Nested arrays are not allowed for using in query params')
  })

  it('should throw the proper error when query has nested object param', () => {
    const query = {
      param: {
        nestedParam: {
          key: 'value'
        }
      }
    }

    expect(() => parseQuery(query)).to.throw('Nested objects are not allowed for using in query params')
  })
})
