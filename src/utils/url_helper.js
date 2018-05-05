import uri from 'urijs'
import UriTemplate from 'urijs/src/URITemplate'

export function resolveTemplate (urlTemplate, bindings) {
  return new UriTemplate(urlTemplate).expand(bindings)
}

export function parseQueryParams (url) {
  return uri(url).query(true)
}
