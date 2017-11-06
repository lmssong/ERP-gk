var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { App, ViewController, ModalCmp } from 'ionic-angular';
import { DatePickerComponent } from './datepicker.component';
var DatePickerDisplayer = (function (_super) {
    __extends(DatePickerDisplayer, _super);
    function DatePickerDisplayer(app, data) {
        var _this = _super.call(this, ModalCmp, data, null) || this;
        _this._app = app;
        _this._enterAnimation = data.opts.enterAnimation;
        _this._leaveAnimation = data.opts.leaveAnimation;
        _this.isOverlay = true;
        return _this;
    }
    DatePickerDisplayer.prototype.getTransitionName = function (direction) {
        var key;
        if (direction === 'back') {
            if (this._leaveAnimation) {
                return this._leaveAnimation;
            }
            key = 'modalLeave';
        }
        else {
            if (this._enterAnimation) {
                return this._enterAnimation;
            }
            key = 'modalEnter';
        }
        return this._nav && this._nav.config.get(key);
    };
    DatePickerDisplayer.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this._app.present(this, navOptions, this._app._appRoot._modalPortal);
    };
    return DatePickerDisplayer;
}(ViewController));
export { DatePickerDisplayer };
var DatePickerController = (function () {
    function DatePickerController(_app) {
        this._app = _app;
    }
    DatePickerController.prototype.create = function (data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        data.component = DatePickerComponent;
        opts.showBackdrop = opts.showBackdrop !== undefined ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = opts.enableBackdropDismiss !== undefined ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;
        return new DatePickerDisplayer(this._app, data);
    };
    return DatePickerController;
}());
DatePickerController = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [App])
], DatePickerController);
export { DatePickerController };
//# sourceMappingURL=datepicker.modal.js.map