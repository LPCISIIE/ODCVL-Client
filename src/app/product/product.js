
export default function Product ($resource, API) {
  return $resource(API.url + '/products/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  })
}

Product.$inject = ['$resource', 'API']
