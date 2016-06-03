var weatherWidget = angular.module('app', [])
  .controller('rootCtrl', ['$scope', '$sce', 'weatherService', function($scope, $sce, weatherService){

    $scope.info = null;

    function init(){

      weatherService.getWeather()
        .then(function(response){

          //tweak data
          var data = response.data.query.results.channel;
          data.item.forecast = data.item.forecast.slice(0,5);
          data.title = data.location.city + ', ' + data.location.region;
          data.item.condition.temp += '°';

          //pass data to view
          $scope.info = data;
        }, function(err){

          console.log(err);
        });
    }

    init();
  }])
  .service('weatherService', ['$http', function($http){

    return {
      getWeather: getWeather
    };

    function getWeather(){

      var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

      return $http({
        method: 'GET',
        url: url
      });
    }

  }]);