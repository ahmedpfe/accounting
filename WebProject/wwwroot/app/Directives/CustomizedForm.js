var app;
(function (app) {
    var Directives;
    (function (Directives) {
        function MyDirective($parse) {
            return {
                restrict: "E",
                priority: -1,
                link: function (scope, ele, attrs) {
                    var targetScope = $parse(attrs.bindToScope)(scope);
                    if (targetScope) {
                        targetScope[attrs.name] = scope[attrs.name];
                    }
                }
            };
        }
        Directives.MyDirective = MyDirective;
    })(Directives = app.Directives || (app.Directives = {}));
})(app || (app = {}));
angular.module('AccountingApp').directive('ngForm', app.Directives.MyDirective);
