
export default function UsersController ($scope, User) {
  let loadUsers = () => {
    User.query((users) => {
      $scope.users = users
    })
  }

  loadUsers()

  $scope.formatRoles = (roles) => {
    let string = ''
    roles.forEach((role, index) => {
      string += role.name + (index === roles.length - 1 ? '' : ', ')
    })

    return string
  }

  $scope.delete = (user) => {
    User.delete({ id: user.id }, loadUsers)
  }

  $scope.isAdmin = (user) => {
    let admin = false
    user.roles.forEach((role) => {
      if (role.name === 'Admin') {
        admin = true
      }
    })

    return admin
  }

  $scope.promote = (user) => {
    User.promote({ id: user.id }, loadUsers)
  }

  $scope.demote = (user) => {
    User.demote({ id: user.id }, loadUsers)
  }
}

UsersController.$inject = ['$scope', 'User']
