import { toCamelCaseDeep, toSnakeCaseDeep } from './case_converter'

describe('utils/case_converter', function () {
  describe('.toCamelCaseDeep', function () {
    it('Should convert a plain object.', function () {
      let object = {
        property_1: '1',
        other_property: '2'
      }

      let converted = toCamelCaseDeep(object)
      expect(converted).to.eql({
        property1: '1',
        otherProperty: '2'
      })
    })

    it('Should convert nested objects.', function () {
      let object = {
        some_property_1: {
          some_property_2: {
            some_property_3: '3'
          }
        }
      }

      let converted = toCamelCaseDeep(object)
      expect(converted).to.eql({
        someProperty1: {
          someProperty2: {
            someProperty3: '3'
          }
        }
      })
    })

    it('Should convert array elements.', function () {
      let object = {
        some_array: [
          { element_1: 1 },
          { element_2: 2 }
        ]
      }

      let converted = toCamelCaseDeep(object)
      expect(converted).to.eql({
        someArray: [
          { element1: 1 },
          { element2: 2 }
        ]
      })
    })

    it('Should convert an array.', function () {
      let object = [
        { element_1: 1 },
        { element_2: 2 }
      ]

      let converted = toCamelCaseDeep(object)
      expect(converted).to.eql([
        { element1: 1 },
        { element2: 2 }
      ])
    })
  })

  describe('.toSnakeCaseDeep', function () {
    it('Should convert a plain object.', function () {
      let object = {
        property1: '1',
        otherProperty: '2'
      }

      let converted = toSnakeCaseDeep(object)
      expect(converted).to.eql({
        property_1: '1',
        other_property: '2'
      })
    })

    it('Should convert nested objects.', function () {
      let object = {
        someProperty1: {
          someProperty2: {
            someProperty3: '3'
          }
        }
      }

      let converted = toSnakeCaseDeep(object)
      expect(converted).to.eql({
        some_property_1: {
          some_property_2: {
            some_property_3: '3'
          }
        }
      })
    })

    it('Should convert array elements.', function () {
      let object = {
        someArray: [
          { element1: 1 },
          { element2: 2 }
        ]
      }

      let converted = toSnakeCaseDeep(object)
      expect(converted).to.eql({
        some_array: [
          { element_1: 1 },
          { element_2: 2 }
        ]
      })
    })

    it('Should convert an array.', function () {
      let object = [
        { element1: 1 },
        { element2: 2 }
      ]

      let converted = toSnakeCaseDeep(object)
      expect(converted).to.eql([
        { element_1: 1 },
        { element_2: 2 }
      ])
    })
  })
})
