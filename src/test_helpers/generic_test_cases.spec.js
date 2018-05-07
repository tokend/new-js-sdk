export function testRequestSignatureBase ({
  server,
  resourceGroup,
  method,
  args = [],
  path,
  params,
  responseClass
}) {
  it(`Should sign the request.`, async () => {
    server
      .onGet(path, { params })
      .reply((config) => {
        if (!config.authorized) {
          return [401]
        }
        return [200, server.makeGenericResponse()]
      })
    let response = await resourceGroup[method](...args)
    expect(response).to.be.an.instanceOf(responseClass)
  })
}

export function testGetRequestBase ({
  title,
  server,
  resourceGroup,
  method,
  args = [],
  path,
  params,
  responseClass
}) {
  it(`Should ${title}.`, async () => {
    server
      .onGet(path, { params })
      .reply(200, server.makeGenericResponse())
    let response = await resourceGroup[method](...args)
    expect(response).to.be.an.instanceOf(responseClass)
  })
}
