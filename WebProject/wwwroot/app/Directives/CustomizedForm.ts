module app.Directives {
    export function MyDirective($parse): ng.IDirective {
        return {
            restrict: "E",
            priority: -1,
            link: function (scope, ele, attrs) {
                var targetScope = $parse(attrs.bindToScope)(scope);
                if (targetScope) {
                    targetScope[attrs.name] = scope[attrs.name];
                }
            }
        }
    }
}
angular.module('AccountingApp').directive('ngForm', app.Directives.MyDirective);