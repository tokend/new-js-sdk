import mocks from '../test_helpers/mock_factory'
import * as errors from './errors'

describe('errors', () => {
  let { axios, axiosMock } = mocks.axios()

  afterEach(() => axiosMock.reset())

  describe('ApiError', () => {
    const rawError = {
      errors: [{
        title: 'Title',
        detail: 'Detail',
        meta: { foo_bar: 'fooBar' }
      }]
    }
    let error

    beforeEach(async () => {
      let response = await makeRawError(rawError)
      error = new errors.ApiError(response, axios)
    })

    it('Should parse error extras.', () => {
      expect(error)
        .to.have.a.property('title')
        .equal(rawError.errors[0].title)
      expect(error)
        .to.have.a.property('detail')
        .equal(rawError.errors[0].detail)
      expect(error)
        .to.have.a.property('meta')
        .deep.equal({
          fooBar: rawError.errors[0].meta.foo_bar
        })
    })
  })

  describe('BadRequestError', () => {
    it('Should parse a single error.', async () => {
      const rawError = {
        errors: [{
          title: 'Title1',
          detail: 'Detail',
          meta: {
            foo_bar: 'fooBar'
          }
        }]
      }
      let response = await makeRawError(rawError)
      let error = new errors.BadRequestError(response, axios)

      expect(error)
        .to.have.a.property('title')
        .equal(rawError.errors[0].title)
      expect(error)
        .to.have.a.property('detail')
        .equal(rawError.errors[0].detail)
      expect(error)
        .to.have.a.property('meta')
        .deep.equal({ fooBar: rawError.errors[0].meta.foo_bar })
    })

    it('Should parse errors array.', async () => {
      const rawError = {
        errors: [
          {
            title: 'Title1',
            detail: 'Detail',
            meta: { foo_bar: 'fooBar' }
          },
          {
            title: 'Title2',
            detail: 'Detail',
            meta: { foo_bar: 'fooBar' }
          }
        ]
      }
      let response = await makeRawError(rawError)
      let error = new errors.BadRequestError(response, axios)

      expect(error).to.have.a.property('nestedErrors').deep.equal([
        {
          title: 'Title1',
          detail: 'Detail',
          meta: { fooBar: 'fooBar' }
        },
        {
          title: 'Title2',
          detail: 'Detail',
          meta: { fooBar: 'fooBar' }
        }
      ])
    })
  })

  function makeRawError (body) {
    axiosMock
      .onAny()
      .reply(403, body)

    return axios.get().catch(err => err)
  }
})
