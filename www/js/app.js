// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SmartShop', ['ionic', 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('intro', {
    url: '/',
    cache: false,
    templateUrl: 'index.html'
  })
  .state('cart', {
    url: '/cart',
    templateUrl: 'views/cart.html'
  })
  .state('add', {
    url: '/add',
    cache: false,
    templateUrl: 'views/add.html'
  })
  .state('scale', {
    url: '/scale',
    cache: false,
    templateUrl: "views/scale.html"
  })
  .state('checkout', {
    url: '/checkout',
    cache: false,
    templateUrl: "views/checkout.html"
  })
  .state('payment', {
    url: '/payment',
    cache: false,
    templateUrl: "views/payment.html"
  });

  $urlRouterProvider.otherwise('/');

})

.controller('mainCtrl', function($scope, $ionicActionSheet, $ionicModal, $state, $http) {

  // This is our "database" shh
  $scope.fetchItemInfo = function(code) {
    var ret;
    switch(code) {
      case '12345':
        ret = {
          name: "Test 12345",
          code: 12345,
          weight_required: false,
          weight: "0.3 kg",
          cost: 7.99
        };
        break;
      case '12345678':
        ret = {
          name: "Test 12345678",
          code: 12345678,
          weight_required: false,
          weight: "0.3 kg",
          cost: 14.75
        };
        break;
      case '123':
        ret = {
          name: "Test 123",
          code: 123,
          weight_required: false,
          weight: "0.3 kg",
          cost: 4.50
        };
        break;
      case '8273928':
        ret = {
          name: "Test 8273928",
          code: 8273928,
          weight_required: false,
          weight: "0.3 kg",
          cost: 3.99
        };
        break;
      default:
        ret = -1;
    }

    return ret;
  }

  $scope.receipts = [];

  $scope.cart = [
    {
      name: "Test Product",
      code: 1234567890,
      weight_required: true,
      weight: "0.3 kg",
      cost: 7.99
    }
  ];

  $scope.proceedToCheckout = function() {
    $state.go('checkout');
  }

  $scope.weighItem = function() {
    return $http({
      method: 'GET',
      url: 'https://jsonp.afeld.me/?url=http://smartshop-sjroot.rhcloud.com/api/readings'
    });
  }

  $scope.updateReading = function() {

    // $scope.test = "Hi!";
    $scope.weighItem().then(function success(res) {
      // $scope.testlol = "Hi again!";
      console.log(res);
      $scope.newItem.value = res.data[0].value;
      $scope.newItem.unit = res.data[0].unit;
      // $scope.reading.unit = res.data[0].unit;
    }, function error(res){
      console.log(res);
    });

  }

  $scope.authenticated = false;
  $scope.signIn = function() {
    $scope.authenticated = true;
    $state.go('cart');
  }
  $scope.signOut = function() {
    $scope.authenticated = false;
    $state.go('intro');
  }

  $scope.removeFromList = function(index) {
    $scope.cart.pop(index);
  }

  $scope.push = function(code) {
    if (code == 123456 || code == '123456') {
      $scope.newItem = $scope.fetchItemInfo(code);
      console.log($scope.newItem);
      $state.go('scale');
    } else {
      $scope.newItem = $scope.fetchItemInfo(code);
      console.log($scope.newItem);
      $scope.cart.push($scope.newItem);
      $state.go('cart');
    }
  }

  $scope.pushWt = function() {
    var cost = $scope.newItem.value * 1.99;
    var weight = $scope.newItem.value.toString() + " " + $scope.newItem.unit;
    var weighedItem = {
      name: 'Weighed Product',
      code: $scope.newItem.code,
      weight_required: true,
      weight: weight,
      cost: cost
    };
    $scope.cart.push(weighedItem);
    $state.go('cart');
  }

  $scope.addItem = function() {
    console.log('Swag');
    var hideSheet = $ionicActionSheet.show({
      titleText: 'Add an Item to Your Shopping Cart',
      buttons: [
        { text: 'Scan Barcode' },
        { text: 'Enter Product Code' }
      ],
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Swag');
      },
      buttonClicked: function(index) {
        switch(index) {
          case 0:
            console.log("SCAN BARCODE");
            cordova.plugins.barcodeScanner.scan(
              function (result) {
                console.log(result);
                if (result.text != '') {
                  if (result.text == '123456') {
                    $scope.newItem = $scope.fetchItemInfo(result.text);
                    console.log($scope.newItem);
                    $state.go('scale');
                  } else {
                    $scope.$apply(function() {
                      $scope.newItem = $scope.fetchItemInfo(result.text);
                      console.log($scope.newItem);
                      $scope.cart.push($scope.newItem);
                    });
                  }
                }
                $state.go('cart')
              },
              function (error) {
                  alert("Scanning failed: " + error);
              }
            );
            break;
          case 1:
            console.log("ENTER PRODUCT CODE");
            $state.go('add');
            console.log("state.go fired");
            break;
          default:
            console.log("Should never happen!");
        }
      }
    });
  }

})
