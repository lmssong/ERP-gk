var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { DatePickerController } from './datepicker.modal';
import { DateService } from './datepicker.service';
var DatePickerDirective = (function () {
    function DatePickerDirective(datepickerCtrl) {
        var _this = this;
        this.datepickerCtrl = datepickerCtrl;
        this.changed = new EventEmitter();
        this.canceled = new EventEmitter();
        this.value = new Date();
        this.dateSelected = new EventEmitter();
        this.dateService = new DateService();
        this.changed.subscribe(function (d) {
            _this.value = d;
        });
    }
    Object.defineProperty(DatePickerDirective.prototype, "locale", {
        set: function (val) {
            if (val)
                this.dateService.locale = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    DatePickerDirective.prototype._click = function (ev) {
        this.open();
    };
    DatePickerDirective.prototype.open = function () {
        var data = {
            min: this.min,
            max: this.max,
            calendar: this.calendar,
            full: this.full,
            dclasses: this.dclasses,
            hclasses: this.hclasses,
            changed: this.changed,
            canceled: this.canceled,
            date: this.value,
            okText: this.okText,
            cancelText: this.cancelText,
            dateSelected: this.dateSelected
        };
        this.modal = this.datepickerCtrl.create(data, this.modalOptions);
        this.modal.present();
    };
    return DatePickerDirective;
}());
__decorate([
    Output('ionChanged'),
    __metadata("design:type", EventEmitter)
], DatePickerDirective.prototype, "changed", void 0);
__decorate([
    Output('ionCanceled'),
    __metadata("design:type", EventEmitter)
], DatePickerDirective.prototype, "canceled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], DatePickerDirective.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], DatePickerDirective.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DatePickerDirective.prototype, "calendar", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DatePickerDirective.prototype, "locale", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DatePickerDirective.prototype, "full", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "okText", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DatePickerDirective.prototype, "cancelText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DatePickerDirective.prototype, "dclasses", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DatePickerDirective.prototype, "hclasses", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerDirective.prototype, "modalOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], DatePickerDirective.prototype, "value", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UIEvent]),
    __metadata("design:returntype", void 0)
], DatePickerDirective.prototype, "_click", null);
DatePickerDirective = __decorate([
    Directive({
        selector: 'ion-datepicker,[ion-datepicker]',
    }),
    __metadata("design:paramtypes", [DatePickerController])
], DatePickerDirective);
export { DatePickerDirective };
//# sourceMappingURL=datepicker.directive.js.map