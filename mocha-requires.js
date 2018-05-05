import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import jsonEqual from 'chai-json-equal'
import { catchPromise, expectThrow, expectNoThrow } from './src/test_helpers/utils'
chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.use(jsonEqual)

global.expect = chai.expect
global.catchPromise = catchPromise
global.expectThrow = expectThrow
global.expectNoThrow = expectNoThrow
