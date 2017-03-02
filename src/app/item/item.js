
export default function Item ($resource, API) {
  return $resource(API.url + '/items/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  })
}

Item.$inject = ['$resource', 'API']
