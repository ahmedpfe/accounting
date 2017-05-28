var app;
(function (app) {
    var Domain;
    (function (Domain) {
        var GenericModel;
        (function (GenericModel) {
            var EntityBase = (function () {
                function EntityBase() {
                }
                EntityBase.prototype.getName = function () {
                    var funcNameRegex = /function (.{1,})\(/;
                    var results = (funcNameRegex).exec(this.constructor.toString());
                    return (results && results.length > 1) ? results[1] : "";
                };
                return EntityBase;
            }());
            GenericModel.EntityBase = EntityBase;
        })(GenericModel = Domain.GenericModel || (Domain.GenericModel = {}));
    })(Domain = app.Domain || (app.Domain = {}));
})(app || (app = {}));
