// Angular allows you to write more modular code
angular.module('libber', []);

// Angular controllers provide initialization 
angular.module('libber')
    .controller('libberCtrl',

function ($scope) {
    $scope.pageId = "1"
    $scope.animal = ['pig', 'hog', 'duck', 'bunny', 'turtle', 'squirrel', 'cow']
    $scope.vegetable = ['turnip', 'carrot', 'potato']
    $scope.fruit = ['apple', 'banana', 'coconut']
    $scope.name = ['Maurice']

    // the main function sets page id for show/hide
    $scope.turnPage = function (in_page) {
        $scope.pageId = in_page
    }
});

// Angular custom directive - like a custom tag
angular.module('libber')
    .directive('choose', function () {
    return {
        template: '<button class="right"  ng-click="$parent.turnPage(page)">{{desc}} - go to page {{page}}</button>',
    }
});

// Angular allows you to add simple text filters
angular.module('libber')
    .filter('capitalize', function () {
    return function (input) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
});
