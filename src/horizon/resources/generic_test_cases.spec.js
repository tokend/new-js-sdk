import {
  testRequestSignatureBase,
  testGetRequestBase
} from '../../test_helpers/generic_test_cases.spec'
import { HorizonResponse } from '../response'

export function testRequestSignature ({
  horizon,
  resourceGroup,
  method,
  args,
  path,
  params
}) {
  testRequestSignatureBase({
    server: horizon,
    responseClass: HorizonResponse,
    resourceGroup,
    method,
    args,
    path,
    params
  })
}

export function testGetRequest ({
  title,
  horizon,
  resourceGroup,
  method,
  args,
  path,
  params
}) {
  testGetRequestBase({
    title,
    server: horizon,
    resourceGroup,
    method,
    args,
    path,
    params,
    responseClass: HorizonResponse
  })
}
