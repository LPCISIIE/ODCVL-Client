
export default function CategoryProduct ($resource, API) {
  return $resource(API.url + '/categories/:category_id/products/:product_id', {
    category_id: '@category_id',
    product_id: '@product_id'
  }, {
    update: { method: 'PUT' }
  })
}

CategoryProduct.$inject = ['$resource', 'API']
