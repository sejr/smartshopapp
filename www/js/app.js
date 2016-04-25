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

  $scope.backToCart = function () {
    $scope.cart = [];
    $state.go('cart');
  }

  $scope.reading = {
    code: '',
    value: 0,
    unit: 'kg'
  };

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
          cost: 7.99,
          image: ''
        };
        break;
      case '12345678':
        ret = {
          name: "Test 12345678",
          code: 12345678,
          weight_required: false,
          weight: "0.3 kg",
          cost: 14.75,
          image: ''
        };
        break;
      case '123456':
        ret = {
          name: "Weighed Item 123456",
          code: 123456,
          weight_required: true,
          weight: "",
          cost: 5.99,
          image: ''
        };
        break;
      case '123':
        ret = {
          name: "Test 123",
          code: 123,
          weight_required: false,
          weight: "0.3 kg",
          cost: 4.50,
          image: ''
        };
        break;
      case '8273928':
        ret = {
          name: "Test 8273928",
          code: 8273928,
          weight_required: false,
          weight: "0.3 kg",
          cost: 3.99,
          image: ''
        };
        break;
      case '070253467905':
        ret = {
          name: "Our Family Mac & Cheese Dinner",
          code: 070253467905,
          weight_required: false,
          weight: "",
          cost: 3.99,
          image: 'https://s3.amazonaws.com/static.caloriecount.about.com/images/medium/family-mac-cheese-dinner-75333.jpg'
        };
        break;
      case '030000018200':
        ret = {
          name: "Quaker Instant - Strawberries & Cream",
          code: 030000018200,
          weight_required: false,
          weight: "",
          cost: 5.99,
          image: 'http://i5.walmartimages.com/dfw/dce07b8c-edca/k2-_27a653f3-d09a-43c4-ba5a-e52c6acdbe6a.v2.jpg'
        };
        break;
      case '070253299193':
        ret = {
          name: "Our Family Scalloped Potatoes",
          code: 070253299193,
          weight_required: false,
          weight: "",
          cost: 4.50,
          image: 'http://i5.walmartimages.com/dfw/dce07b8c-edca/k2-_27a653f3-d09a-43c4-ba5a-e52c6acdbe6a.v2.jpg'
        };
        break;
      case '030000169001':
        ret = {
          name: "Quaker Apple Cinnamon Rice Cakes",
          code: 030000169001,
          weight_required: false,
          weight: "",
          cost: 2.99,
          image: 'http://cementplace.com/image/catalog/images/Quaker%20Apple%20Cinnamon%20Rice%20Cake%20-%20Gluten%20Free%20-%206.52%20%20oz.jpg'
        };
        break;
      case '038000596551':
        ret = {
          name: "Kellogg's Frosted Flakes Cereal",
          code: 038000596551,
          weight_required: false,
          weight: "",
          cost: 7.79,
          image: 'https://upload.wikimedia.org/wikipedia/en/a/af/Frosted-Flakes-Box-Small.jpg'
        };
        break;
      case '064144043101':
        ret = {
          name: "Chef Boyardee Mini Ravioli",
          code: 064144043101,
          weight_required: false,
          weight: "",
          cost: 9.99,
          image: 'https://fa74d61d848a20b729bb-0251b36b713060ab3e0e8321940e01ff.ssl.cf2.rackcdn.com/0064144043060_CF_version_type_large.jpeg'
        };
        break;
      case '074235330058':
        ret = {
          name: "Mrs. Grass Extra Noodles",
          code: 074235330058,
          weight_required: false,
          weight: "",
          cost: 7.99,
          image: 'http://i5.walmartimages.com/dfw/dce07b8c-24f8/k2-_97be9924-e0fe-4b3d-86db-a7e9cddd56d2.v3.jpg'
        };
        break;
      case '9999':
        ret = {
          name: "Apple",
          code: 9999,
          weight_required: true,
          weight: "",
          cost: 2.99,
          image: 'http://weknowyourdreamz.com/images/apple/apple-01.jpg'
        };
        break;
      default:
        ret = -1;
    }

    return ret;
  }

  $scope.receipts = [];

  $scope.cart = [
    // {
    //   name: "Test Product",
    //   code: 1234567890,
    //   weight_required: true,
    //   weight: "0.3 kg",
    //   cost: 7.99
    // }
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
      $scope.reading.value = res.data[0].value;
      $scope.reading.unit = res.data[0].unit;
      // $scope.reading.unit = res.data[0].unit;
    }, function error(res){
      console.log(res);
    });

  }

  $scope.mustBeWeighed = function(code) {
    var item = $scope.fetchItemInfo(code);
    return item.weight_required;
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

  $scope.removeFromList = function(item) {
    var index = $scope.cart.indexOf(item);
    $scope.cart.pop(index);
  }

  $scope.push = function(code) {
    console.log(code);
    console.log($scope.mustBeWeighed(code));
    if ($scope.mustBeWeighed(code)) {
      $scope.newItem = $scope.fetchItemInfo(code);
      console.log("fetchItemInfo result: " + $scope.newItem);
      $state.go('scale');
    } else {
      $scope.newItem = $scope.fetchItemInfo(code);
      console.log($scope.newItem);
      $scope.cart.push($scope.newItem);
      $state.go('cart');
    }
  }

  $scope.pushWt = function() {
    console.log($scope.reading);
    var cost = $scope.reading.value * $scope.newItem.cost;
    var weight = $scope.reading.value.toString() + " " + $scope.reading.unit;
    var weighedItem = {
      name: $scope.newItem.name,
      code: $scope.newItem.code,
      weight_required: true,
      weight: weight,
      cost: cost,
      image: $scope.newItem.image
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
                // alert(result.text);
                if (result.text != '') {
                  if ($scope.mustBeWeighed(result.text)) {
                    // $scope.reading.code = result.text;
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
