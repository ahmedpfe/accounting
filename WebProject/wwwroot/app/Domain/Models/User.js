var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var app;
(function (app) {
    var Domain;
    (function (Domain) {
        var Models;
        (function (Models) {
            var User = (function (_super) {
                __extends(User, _super);
                function User(idUser, usernameUser, nomUser, prenomUser, adresseUser) {
                    var _this = _super.call(this) || this;
                    _this.idUser = idUser;
                    _this.usernameUser = usernameUser;
                    _this.nomUser = nomUser;
                    _this.prenomUser = prenomUser;
                    _this.adresseUser = adresseUser;
                    _this.idUser = idUser;
                    _this.usernameUser = usernameUser;
                    _this.nomUser = nomUser;
                    _this.prenomUser = prenomUser;
                    _this.adresseUser = adresseUser;
                    return _this;
                }
                return User;
            }(app.Domain.GenericModel.EntityBase));
            Models.User = User;
        })(Models = Domain.Models || (Domain.Models = {}));
    })(Domain = app.Domain || (app.Domain = {}));
})(app || (app = {}));
