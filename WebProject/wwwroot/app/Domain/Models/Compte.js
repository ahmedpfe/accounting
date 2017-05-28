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
            var Compte = (function (_super) {
                __extends(Compte, _super);
                function Compte(idCpt, codeCpt, libelleCpt, idCptParent, visibilityCpt, montantCpt) {
                    var _this = _super.call(this) || this;
                    _this.idCpt = idCpt;
                    _this.codeCpt = codeCpt;
                    _this.libelleCpt = libelleCpt;
                    _this.idCptParent = idCptParent;
                    _this.visibilityCpt = visibilityCpt;
                    _this.montantCpt = montantCpt;
                    _this.idCpt = idCpt;
                    _this.codeCpt = codeCpt;
                    _this.libelleCpt = libelleCpt;
                    _this.idCptParent = idCptParent;
                    _this.visibilityCpt = visibilityCpt;
                    _this.montantCpt = montantCpt;
                    return _this;
                }
                return Compte;
            }(app.Domain.GenericModel.EntityBase));
            Models.Compte = Compte;
        })(Models = Domain.Models || (Domain.Models = {}));
    })(Domain = app.Domain || (app.Domain = {}));
})(app || (app = {}));
