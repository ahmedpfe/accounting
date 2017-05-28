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
            var ExerciceComptable = (function (_super) {
                __extends(ExerciceComptable, _super);
                function ExerciceComptable(idExercice, libelleExercice, dateOuvertureExercice, dateFinExercice, statusExercice, dateClotureExercice) {
                    var _this = _super.call(this) || this;
                    _this.idExercice = idExercice;
                    _this.libelleExercice = libelleExercice;
                    _this.dateOuvertureExercice = dateOuvertureExercice;
                    _this.dateFinExercice = dateFinExercice;
                    _this.statusExercice = statusExercice;
                    _this.dateClotureExercice = dateClotureExercice;
                    _this.idExercice = idExercice;
                    _this.libelleExercice = libelleExercice;
                    _this.dateOuvertureExercice = dateOuvertureExercice;
                    _this.dateFinExercice = dateFinExercice;
                    _this.statusExercice = statusExercice;
                    _this.dateClotureExercice = dateClotureExercice;
                    return _this;
                }
                return ExerciceComptable;
            }(app.Domain.GenericModel.EntityBase));
            Models.ExerciceComptable = ExerciceComptable;
        })(Models = Domain.Models || (Domain.Models = {}));
    })(Domain = app.Domain || (app.Domain = {}));
})(app || (app = {}));
