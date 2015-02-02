var mod = angular.module('testApp', []);

mod.controller('testController', function ($scope, errorService, $http) {

    // Does not require the injected error service
    $scope.testController = function () {
        throw {
            message: 'thrown error message'
        }
    }

    /* Requires injected error service - usage:
    $http({method: 'GET', url: queryString})
        .success(function(data, status, headers, config) { ... })
		.error(errorService.angularHttpError) */
    $scope.testService = function () {
        errorService.genericError('generic error message')
    }

 /*   $scope.testEndpoint = function () {
        var queryString = "http://some/rest/api/resource/1"
        $http({
            method: 'GET',
            url: queryString
        })
            .success(function (data, status, headers, config) {
        })
            .error(errorService.angularHttpError)
    }*/

});

mod.controller('errorController', function ($scope) {
    $scope.errorText = 'No Errors'
    $scope.showErrors = false

    $scope.$on('event:error',

    function (event, data) {
        $scope.errorText = data
        $scope.showErrors = true
    })

});

mod.factory('$exceptionHandler', function ($injector) {
    return function (exception, cause) {
        var rootScope = $injector.get('$rootScope')
        if (rootScope) {
            rootScope.$broadcast('event:error', exception.message)
        }
    }
});

mod.factory('errorService', function ($rootScope) {
    var errorService = {}

    errorService.genericError = function (errorMessage) {
        $rootScope.$broadcast('event:error', errorMessage)
    }

    errorService.angularHttpError = function (data, status, headers, config) {
        $rootScope.$broadcast('event:error', 'http: ' + status)
    }

    return errorService
});
