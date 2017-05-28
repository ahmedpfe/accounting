var app;
(function (app) {
    var Exceptions;
    (function (Exceptions) {
        var Model;
        (function (Model) {
            var Exception = (function () {
                function Exception(code, status) {
                    this.code = code;
                    this.status = status;
                }
                return Exception;
            }());
            Model.Exception = Exception;
        })(Model = Exceptions.Model || (Exceptions.Model = {}));
    })(Exceptions = app.Exceptions || (app.Exceptions = {}));
})(app || (app = {}));
