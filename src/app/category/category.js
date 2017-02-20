
export default function Category ($resource, API) {
  return $resource(API.url + '/categories/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  })
}

Category.$inject = ['$resource', 'API']
