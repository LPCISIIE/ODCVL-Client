export default function LocationItem ($resource, API) {
  return $resource(API.url + '/locations/:id/items', {
    id: '@id'
  }, {
    update: { method: 'PUT' }
  })
}
LocationItem.$inject = ['$resource', 'API']
