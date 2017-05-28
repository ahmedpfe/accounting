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
            var Ecriture = (function (_super) {
                __extends(Ecriture, _super);
                function Ecriture(numSequenceEcriture, libelleEcriture, dateEcriture, reference, numeroOperation, codeJ, compte, montantDebitEcriture, montantCreditEcriture, dateValidationEcriture, dateEcheanceEcriture) {
                    var _this = _super.call(this) || this;
                    _this.numSequenceEcriture = numSequenceEcriture;
                    _this.libelleEcriture = libelleEcriture;
                    _this.dateEcriture = dateEcriture;
                    _this.reference = reference;
                    _this.numeroOperation = numeroOperation;
                    _this.codeJ = codeJ;
                    _this.compte = compte;
                    _this.montantDebitEcriture = montantDebitEcriture;
                    _this.montantCreditEcriture = montantCreditEcriture;
                    _this.dateValidationEcriture = dateValidationEcriture;
                    _this.dateEcheanceEcriture = dateEcheanceEcriture;
                    _this.numSequenceEcriture = numSequenceEcriture;
                    _this.libelleEcriture = libelleEcriture;
                    _this.dateEcriture = dateEcriture;
                    _this.reference = reference;
                    _this.numeroOperation = numeroOperation;
                    _this.codeJ = codeJ;
                    _this.compte = compte;
                    _this.montantDebitEcriture = montantDebitEcriture;
                    _this.montantCreditEcriture = montantCreditEcriture;
                    _this.dateEcheanceEcriture = dateEcheanceEcriture;
                    _this.dateValidationEcriture = dateValidationEcriture;
                    return _this;
                }
                return Ecriture;
            }(app.Domain.GenericModel.EntityBase));
            Models.Ecriture = Ecriture;
        })(Models = Domain.Models || (Domain.Models = {}));
    })(Domain = app.Domain || (app.Domain = {}));
})(app || (app = {}));
