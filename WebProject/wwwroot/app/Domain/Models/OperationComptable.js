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
            var Operation = (function (_super) {
                __extends(Operation, _super);
                function Operation(libelleOp, montantOp, dateOp, idExerciceComptable, numPieceJustificatifOp, userId) {
                    var _this = _super.call(this) || this;
                    _this.libelleOp = libelleOp;
                    _this.montantOp = montantOp;
                    _this.dateOp = dateOp;
                    _this.idExerciceComptable = idExerciceComptable;
                    _this.numPieceJustificatifOp = numPieceJustificatifOp;
                    _this.userId = userId;
                    _this.libelleOp = libelleOp;
                    _this.montantOp = montantOp;
                    _this.dateOp = dateOp;
                    _this.idExerciceComptable = idExerciceComptable;
                    _this.numPieceJustificatifOp = numPieceJustificatifOp;
                    _this.userId = userId;
                    return _this;
                }
                return Operation;
            }(app.Domain.GenericModel.EntityBase));
            Models.Operation = Operation;
        })(Models = Domain.Models || (Domain.Models = {}));
    })(Domain = app.Domain || (app.Domain = {}));
})(app || (app = {}));
