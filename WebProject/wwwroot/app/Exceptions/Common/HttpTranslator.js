var app;
(function (app) {
    var Exceptions;
    (function (Exceptions) {
        var Common;
        (function (Common) {
            var HttpTranslator = (function () {
                function HttpTranslator() {
                    this.timer = 5000;
                }
                HttpTranslator.prototype.messageProvided = function (code) {
                    switch (code) {
                        case 404:
                            return "Error up while loading data";
                        case 400:
                            return "Check your data..Something wrong";
                        case 401:
                            return "Delete unauthorized..this entity is linked to another one..delete the dependencies first";
                        case 500:
                            return "Service unavailable";
                    }
                };
                HttpTranslator.prototype.successMessage = function (action) {
                    switch (action) {
                        case "creation":
                            return "Created successfully";
                        case "update":
                            return "Updated successfully";
                        case "delete":
                            return "Deleted successfully";
                    }
                };
                HttpTranslator.prototype.SpecificmessageProvided = function (code, Entity) {
                    switch (code) {
                        case 404:
                            return "Error up while loading data";
                        case 400:
                            return "Check your data Entry..Something wrong";
                        case 401:
                            return "Delete unauthorized.." + Entity.getName() + " is linked to another one..delete the dependencies first";
                        case 500:
                            return "Service unavailable";
                    }
                };
                HttpTranslator.prototype.failedMessage = function (action) {
                    switch (action) {
                        case "creation":
                            return "Check your data Entry..Something wrong";
                        case "update":
                            return "Update failed..please check your data";
                        case "delete":
                            return "Something wrong up during the process..try again";
                    }
                };
                return HttpTranslator;
            }());
            Common.HttpTranslator = HttpTranslator;
            angular.module('AccountingApp')
                .service('httpTranslator', HttpTranslator);
        })(Common = Exceptions.Common || (Exceptions.Common = {}));
    })(Exceptions = app.Exceptions || (app.Exceptions = {}));
})(app || (app = {}));
