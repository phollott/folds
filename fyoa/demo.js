// define a module called 'pager'
var mod = angular.module('pager', []);

// define an element custom directive called 'choose'
mod.directive('choose', function () {
    return {
        restrict: 'E', // only allow element
        scope: {
            page: '@page', // attributed scope
            desc: '@desc'
        },
        template: '<button ng-click="$parent.turnPage(page)">{{desc}} - go to page {{page}}</button>',
        transclude: false, // I'll be honest, I don't like
        replace: false // transclusion and replacement
    }
});

// define a controller for page behavior
mod.controller('pageController', function ($scope) {
    $scope.pageId = "1"
    $scope.fade = false;

    var test1 = {
        "level": 0,
        "pitch": [{
            "swing": "BLOCK!",
                "hit": "BLOCKED!",
                "seal": "B"
        }, {
            "swing": "Attack Attack!",
                "hit": "SMASH!!!",
                "seal": "A"
        }, {
            "swing": "Channeling!",
                "hit": "Channel",
                "seal": "C"
        }]
    }

    var test2 = {
        "level": 0,
        "pitch": [{
            "swing": "Attack!",
                "hit": "DAMAGE!",
                "seal": "A"
        }, {
            "swing": "Block, Block Block",
                "hit": "Defend",
                "seal": "B"
        }]
    }

    $scope.selectPitch = function (pitches) {
        var p = Math.floor(Math.random() * pitches.length)
        var pitch = pitches[p]
        return pitch
    }

    $scope.reset = function () {
        test1.level = test1.pitch.length
        test2.level = test2.pitch.length
    }
    
    $scope.pitch = function () {
        var pitch1 = $scope.selectPitch(test1.pitch)
        var pitch2 = $scope.selectPitch(test2.pitch)

        var melee;

        if (pitch1.seal === pitch2.seal) {
            melee = [pitch1.swing, pitch2.swing] //shuffle?
        } else {
            var winner, loser;
            var seals = pitch1.seal + pitch2.seal
            if ('ABCA'.indexOf(seals) > -1) {
                winner = pitch2
                loser = pitch1
                --test1.level
            } else {
                winner = pitch1
                loser = pitch2
                --test2.level
            }
            melee = [loser.swing, winner.swing, winner.hit]
        }
        melee = melee.concat([test1.level + ' ' + test2.level])
        var result = melee.join('\n')
        alert(result);
    }

    // the main function here sets the page id for show/hide
    $scope.turnPage = function (in_page, in_href) {
        if (in_href) {
            window.open(in_href + in_page, '_self', false)
        } else {
            $scope.pageId = in_page
        }
    }

    $scope.moxie = 3
    $scope.mojo = 3
    $scope.money = 3

    $scope.alterMojo = function (n) {
        if (n !== undefined) {
            $scope.mojo += parseInt(n)
            if ($scope.mojo < 0) $scope.mojo = 0
        }
    }

    $scope.alterMoxie = function (n) {
        if (n !== undefined) {
            $scope.moxie += parseInt(n)
            if ($scope.moxie < 0) $scope.moxie = 0
        }
    }

    $scope.alterMoney = function (n) {
        if (n !== undefined) {
            $scope.money += parseInt(n)
            if ($scope.money < 0) $scope.money = 0
        }
    }
});

mod.filter('voldemort', function () {
    return function (input, scope) {
        if (input.length > 10) {
            return 'aaaqa';
        }
        return ''; //input.substring(0, 1).toUpperCase() + input.substring(1);
    }
});

mod.directive('choice', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            page: '@page',
            href: '@href',
            desc: '@desc',
            mojo: '@mojo',
            moxie: '@moxie',
            money: '@money'
        },
        template: '<button ng-click="$parent.turnPage(page,href);$parent.alterMojo(mojo);$parent.alterMoxie(moxie);$parent.alterMoney(money)">{{desc}} - go to page {{page}}</button>',
        replace: true
    }
});
