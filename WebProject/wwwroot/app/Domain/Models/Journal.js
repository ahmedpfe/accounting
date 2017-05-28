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
            var Journal = (function (_super) {
                __extends(Journal, _super);
                function Journal(codeJournal, libelleJournal, prefixJournal, patternEcriture) {
                    var _this = _super.call(this) || this;
                    _this.codeJournal = codeJournal;
                    _this.libelleJournal = libelleJournal;
                    _this.prefixJournal = prefixJournal;
                    _this.patternEcriture = patternEcriture;
                    _this.codeJournal = codeJournal;
                    _this.libelleJournal = libelleJournal;
                    _this.prefixJournal = prefixJournal;
                    _this.patternEcriture = patternEcriture;
                    return _this;
                }
                return Journal;
            }(app.Domain.GenericModel.EntityBase));
            Models.Journal = Journal;
        })(Models = Domain.Models || (Domain.Models = {}));
    })(Domain = app.Domain || (app.Domain = {}));
})(app || (app = {}));
