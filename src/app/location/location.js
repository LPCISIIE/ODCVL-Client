
export default function Location ($resource, API) {
  return $resource(API.url + '/locations/:id', { id: '@id' }, {
    update: { method: 'PUT' },
    activate: {
      method: 'PUT',
      params: { id: '@id' },
      url: API.url + '/locations/activation/:id'
    }
  })
}

Location.$inject = ['$resource', 'API']
