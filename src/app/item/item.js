
export default function Item ($resource, API) {
  return $resource(API.url + '/items/:id', { id: '@id' }, {
    update: { method: 'PUT' },
    getbyCode: {
      method: 'GET',
      params: { id: '@id' },
      url: API.url + '/items/barcode/:id'
    }
  })
}

Item.$inject = ['$resource', 'API']
