
export default function AddLocationController ($scope, $state, Client, FlashService) {
  $scope.client = {
    nom: '',
    prenom: '',
    organisme: '',
    adresse: '',
    telephone: '',
    email: ''
  }
  $scope.model = {
    barcode: '',
  };
  $scope.barcodeScanned = function(barcode) {        
        console.log('callback received barcode: ' + barcode);                     
        $scope.model.barcode = barcode;        
    }
}

AddLocationController.$inject = ['$scope', '$state', 'Client', 'FlashService']
