myApp.factory('pubSub', [
    '$timeout',
    function ($timeout) {
        var pubSub = {};
        pubSub.subscribe = function (topic, scope, callback) {
            function callback_wrap() {
                var args = arguments;
                $timeout(function () {
                    callback && callback.apply(scope, args);
                });
            }
            amplify.subscribe(topic, scope, callback_wrap);
            scope && scope.$on("$destroy", function () {
                pubSub.unsubscribe(topic, scope, callback_wrap);
            });
        };

        pubSub.unsubscribe = function (topic, scope, callback) {
            amplify.unsubscribe(topic, scope, callback);
        };

        pubSub.publish = function () {
            amplify.publish.apply(pubSub.context, arguments);
        };

        return pubSub;
    }
]);