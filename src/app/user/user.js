
export default function User ($resource, API) {
  return $resource(API.url + '/users/:id', { id: '@id' }, {
    update: { method: 'PUT' },
    login: {
      method: 'POST',
      url: API.url + '/login'
    },
    register: {
      method: 'POST',
      url: API.url + '/register'
    },
    me: {
      method: 'GET',
      url: API.url + '/users/me'
    }
  })
}

User.$inject = ['$resource', 'API']
