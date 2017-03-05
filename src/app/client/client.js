
export default function Client ($resource, API) {
  return $resource(API.url + '/clients/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  })
}

Client.$inject = ['$resource', 'API']
