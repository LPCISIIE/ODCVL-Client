
export default function Location ($resource, API) {
  return $resource(API.url + '/locations/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  })
}

Location.$inject = ['$resource', 'API']
