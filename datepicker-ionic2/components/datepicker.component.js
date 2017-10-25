var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, ViewChild, ViewEncapsulation } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { DateService } from './datepicker.service';
var DatePickerComponent = (function () {
    function DatePickerComponent(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.hClasses = [];
        this.dClasses = [];
        this.full = false;
        this.calendar = false;
        this.today = new Date();
        this.selectedDate = new Date();
        this.active = false;
        this.type = 'date';
        this.mode = 'calendar';
        this.DatepickerService = new DateService();
        this.callback = navParams.data.changed;
        this.cancel = navParams.data.canceled;
        this.min = navParams.data.min;
        this.max = navParams.data.max;
        this.hClasses = navParams.data.hclasses || [];
        this.dClasses = navParams.data.dclasses || [];
        this.full = navParams.data.full || false;
        this.calendar = navParams.data.calendar || false;
        this.selectedDate = navParams.data.date || new Date();
        this.okText = navParams.data.okText || 'OK';
        this.dateSelected = navParams.data.dateSelected || new EventEmitter();
        this.cancelText = navParams.data.cancelText || 'Cancel';
        if (this.calendar)
            this.type = 'calendar';
        this.initialize();
    }
    DatePickerComponent.prototype.initialize = function () {
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
    };
    DatePickerComponent.prototype.openModal = function () {
        this.active = !this.active;
    };
    DatePickerComponent.prototype.getDaysOfWeek = function () {
        if (!this.weekdays) {
            this.weekdays = this.DatepickerService.getDaysOfWeek();
        }
        return this.weekdays;
    };
    DatePickerComponent.prototype.ngAfterViewChecked = function () {
        if (this.dayscroll && this.type === 'date')
            this.dayscroll.nativeElement.scrollTop = this.selectedDate.getDate() * (this.dayscroll.nativeElement.scrollHeight / this.dateList.length);
        else if (this.yearscroll && this.type === 'year')
            this.yearscroll.nativeElement.scrollTop = (this.selectedDate.getFullYear() - 1900) * (this.yearscroll.nativeElement.scrollHeight / this.getYears().length);
    };
    DatePickerComponent.prototype.getMonths = function () {
        if (!this.months) {
            this.months = this.DatepickerService.getMonths();
        }
        return this.months;
    };
    DatePickerComponent.prototype.getYears = function () {
        return this.DatepickerService.getYears();
    };
    DatePickerComponent.prototype.createDateList = function (selectedDate) {
        this.dateList = this.DatepickerService.createDateList(selectedDate);
        this.cols = new Array(7);
        this.rows = new Array(Math.round(this.dateList.length / this.cols.length) + 1);
    };
    DatePickerComponent.prototype.getDate = function (row, col) {
        return this.dateList[row * 7 + col];
    };
    DatePickerComponent.prototype.isDefined = function (date) {
        return date !== undefined;
    };
    DatePickerComponent.prototype.isDisabled = function (date) {
        if (!date)
            return true;
        if (this.min) {
            this.min.setHours(0, 0, 0, 0);
            if (date < this.min)
                return true;
        }
        if (this.max) {
            this.max.setHours(0, 0, 0, 0);
            if (date > this.max)
                return true;
        }
        return false;
    };
    DatePickerComponent.prototype.isActualDate = function (date) {
        if (!date)
            return false;
        return date.getDate() === this.today.getDate() &&
            date.getMonth() === this.today.getMonth() &&
            date.getFullYear() === this.today.getFullYear();
    };
    DatePickerComponent.prototype.isActualMonth = function (month) {
        return month === this.today.getMonth();
    };
    DatePickerComponent.prototype.isActualYear = function (year) {
        return year === this.today.getFullYear();
    };
    DatePickerComponent.prototype.isSelectedDate = function (date) {
        if (!date)
            return false;
        return date.getDate() === this.selectedDate.getDate() &&
            date.getMonth() === this.selectedDate.getMonth() &&
            date.getFullYear() === this.selectedDate.getFullYear();
    };
    DatePickerComponent.prototype.isSelectedMonth = function (month) {
        return month === this.tempDate.getMonth();
    };
    DatePickerComponent.prototype.isSelectedYear = function (year) {
        return year === this.tempDate.getFullYear();
    };
    DatePickerComponent.prototype.changeType = function (val) {
        if (this.type === 'calendar')
            return;
        this.type = val;
    };
    DatePickerComponent.prototype.showType = function (val) {
        return this.type === val;
    };
    DatePickerComponent.prototype.selectDate = function (date) {
        if (this.isDisabled(date))
            return;
        this.selectedDate = date;
        this.selectedDate.setHours(0, 0, 0, 0);
        this.tempDate = this.selectedDate;
        this.dateSelected.emit(this.tempDate);
    };
    DatePickerComponent.prototype.selectMonth = function (month) {
        this.tempDate.setMonth(month);
        if (this.tempDate.getMonth() !== month) {
            this.tempDate.setDate(0);
        }
        this.changeType('date');
        this.selectMonthOrYear();
    };
    DatePickerComponent.prototype.selectYear = function (year) {
        this.tempDate.setFullYear(year);
        this.changeType('month');
        this.selectMonthOrYear();
    };
    DatePickerComponent.prototype.getSelectedWeekday = function () {
        if (!this.weekdays)
            this.getDaysOfWeek();
        return this.weekdays[this.selectedDate.getDay()];
    };
    DatePickerComponent.prototype.getSelectedMonth = function () {
        if (!this.months)
            this.getMonths();
        return this.months[this.selectedDate.getMonth()];
    };
    DatePickerComponent.prototype.getTempMonth = function () {
        if (!this.months)
            this.getMonths();
        return this.months[this.tempDate.getMonth()];
    };
    DatePickerComponent.prototype.getTempYear = function () {
        return this.tempDate.getFullYear() || this.selectedDate.getFullYear();
    };
    DatePickerComponent.prototype.onCancel = function (e) {
        if (this.date)
            this.selectedDate = this.date || new Date();
        this.cancel.emit();
        this.viewCtrl.dismiss();
    };
    ;
    DatePickerComponent.prototype.onDone = function (e) {
        this.date = this.selectedDate;
        this.callback.emit(this.date);
        this.viewCtrl.dismiss();
    };
    ;
    DatePickerComponent.prototype.selectMonthOrYear = function () {
        this.createDateList(this.tempDate);
        if (this.isDisabled(this.tempDate))
            return;
        this.selectedDate = this.tempDate;
    };
    DatePickerComponent.prototype.limitTo = function (arr, limit) {
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        return arr.slice(0, limit);
    };
    DatePickerComponent.prototype.getMonthRows = function () {
        return [];
    };
    DatePickerComponent.prototype.nextMonth = function () {
        var testDate = new Date(this.tempDate.getTime());
        testDate.setDate(1);
        if (testDate.getMonth() === 11) {
            testDate.setFullYear(testDate.getFullYear() + 1);
            testDate.setMonth(0);
        }
        else {
            testDate.setMonth(testDate.getMonth() + 1);
        }
        if (!this.max || this.max >= testDate) {
            this.tempDate = testDate;
            this.createDateList(this.tempDate);
        }
    };
    DatePickerComponent.prototype.prevMonth = function () {
        var testDate = new Date(this.tempDate.getTime());
        testDate.setDate(0);
        if (!this.min ||
            (this.min <= testDate)) {
            this.tempDate = testDate;
            this.createDateList(this.tempDate);
        }
    };
    return DatePickerComponent;
}());
__decorate([
    ViewChild('dayscroll'),
    __metadata("design:type", ElementRef)
], DatePickerComponent.prototype, "dayscroll", void 0);
__decorate([
    ViewChild('yearscroll'),
    __metadata("design:type", ElementRef)
], DatePickerComponent.prototype, "yearscroll", void 0);
DatePickerComponent = __decorate([
    Component({
        template: "\n    <div class=\"datepicker-modal-container\">\n    <div class=\"datepicker-modal\" [style.width]=\"full?'100%':''\" [style.height]=\"full?'100%':''\">\n        <div class=\"datepicker-modal-head datepicker-balanced white bold\" [ngClass]=\"hClasses\">\n            <div class=\"datepicker-modal-title\">{{getSelectedWeekday()}}</div>\n        </div>\n        <div class=\"center datepicker-balanced-light datepicker-modal-head-details\" [ngClass]=\"dClasses\">\n            <div class=\"row\">\n                <div class=\"col datepicker-month-js datepicker-month\" (click)=\"changeType('month')\">\n                    {{limitTo(getSelectedMonth(),3)}}\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col datepicker-day-of-month \" (click)=\"changeType('date')\">\n                    {{selectedDate | date: 'd'}}\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col datepicker-year-js datepicker-year \" (click)=\"changeType('year')\">\n                    {{selectedDate | date: 'yyyy'}}\n                </div>\n            </div>\n        </div>\n        <div class=\"datepicker-month-content-js datepicker-content\" *ngIf=\"showType('month')\">\n            <div class=\"row center\" *ngFor=\"let month of getMonths(); let i = index;\">\n                <div class=\"col datepicker-selection datepicker-date-cell\" [ngClass]=\"{\n                  'datepicker-selected': isSelectedMonth(i),\n                  'datepicker-current': isActualMonth(i)\n                  }\" (click)=\"selectMonth(i)\">\n                    {{limitTo(month,3)}}\n                </div>\n            </div>\n        </div>\n        <div #dayscroll class=\"datepicker-content\" *ngIf=\"showType('date')\">\n           <!-- <div class=\"row col center\">\n                {{getTempMonth()}} {{tempDate | date: 'yyyy'}}\n            </div>\n            <div class=\"row center\">\n\t\t\t\t<div class=\"col bold\" *ngFor=\"let dayOfWeek of getDaysOfWeek(); let i = index;\">\n\t\t\t\t\t{{limitTo(dayOfWeek,3)}}\n\t\t\t\t</div>\n\t\t\t</div>-->\n            <div class=\"datepicker-content\">\n                <div class=\"row center\" *ngFor=\"let row of rows;let i = index\">\n                    <div class=\"col no-padding\" *ngFor=\"let col of cols;let j =index\" [ngClass]=\"{\n                  'datepicker-date-col': isDefined(getDate(i, j)),\n                  'datepicker-selected': isSelectedDate(getDate(i, j)),\n                  'datepicker-current' : isActualDate(getDate(i, j)),\n                  'datepicker-disabled': isDisabled(getDate(i, j))\n                  }\">\n                        <div class=\"datepicker-date-cell\" (click)=\"selectDate(getDate(i, j))\">\n                            {{ getDate(i, j) | date: 'd' }}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div #yearscroll class=\"datepicker-year-content-js datepicker-content\" *ngIf=\"showType('year')\">\n            <div class=\"row center\" *ngFor=\"let year of getYears();let i = index;\">\n                <div class=\"col datepicker-selection datepicker-date-cell\" [ngClass]=\"{\n                  'datepicker-selected': isSelectedYear(year),\n                  'datepicker-current': isActualYear(year)\n                  }\" (click)=\"selectYear(year)\">\n                    {{year}}\n                </div>\n            </div>\n        </div>\n        <div class=\"datepicker-calendar\" *ngIf=\"showType('calendar')\">\n            <div class=\"row col center\">\n            <button (click)=\"prevMonth()\" ion-button=\"\" class=\"disable-hover button button-ios button-default button-default-ios\"><span class=\"button-inner\"><ion-icon name=\"arrow-back\" role=\"img\" class=\"icon icon-ios ion-ios-arrow-back\" aria-label=\"arrow-back\" ng-reflect-name=\"arrow-back\"></ion-icon></span><div class=\"button-effect\"></div></button>\n\n              {{getTempMonth()}}  {{getTempYear()}}\n     <button (click)=\"nextMonth()\" ion-button=\"\" class=\"disable-hover button button-ios button-default button-default-ios\"><span class=\"button-inner\"><ion-icon name=\"arrow-forward\" role=\"img\" class=\"icon icon-ios ion-ios-arrow-forward\" aria-label=\"arrow-forward\" ng-reflect-name=\"arrow-forward\"></ion-icon></span><div class=\"button-effect\"></div></button>            </div>\n            <div class=\"row calendar-row\">\n                <span class=\"col bold calendar-cell\" *ngFor=\"let dayOfWeek of getDaysOfWeek()\">\n                    {{limitTo(dayOfWeek,3)}}\n                </span>\n            </div>\n            <div *ngFor=\"let week of rows;let i = index;\" class=\"row calendar-row\">\n                <span class=\"col calendar-cell datepicker-selection datepicker-date-cell\" *ngFor=\"let day of cols;let j=index;\" [ngClass]=\"{\n                  'datepicker-date-col': isDefined(getDate(i, j)),\n                  'datepicker-selected': isSelectedDate(getDate(i, j)),\n                  'datepicker-current' : isActualDate(getDate(i, j)),\n                  'datepicker-disabled': isDisabled(getDate(i, j))\n                  }\" (click)=\"selectDate(getDate(i, j))\">\n\t\t\t\t\t{{getDate(i, j) | date:'d'}}\n\t\t\t\t</span>\n            </div>\n        </div>\n        <div class=\"datepicker-modal-buttons\">\n                    <button (click)=\"onCancel($event)\" ion-button=\"\" class=\"datepicker-cancel-js button button-clear button-small col-offset-33 disable-hover button button-ios button-default button-default-ios\"><span class=\"button-inner\">{{cancelText}}</span><div class=\"button-effect\"></div></button>\n                    <button (click)=\"onDone($event)\" ion-button=\"\" class=\"datepicker-ok-js button button-clear button-small disable-hover button button-ios button-default button-default-ios\"><span class=\"button-inner\">{{okText}}</span><div class=\"button-effect\"></div></button>\n        </div>\n    </div>\n</div>",
        styles: ["\n    .datepicker-content {\n  overflow: auto\n}\n\n.visible-overflow {\n  overflow: visible\n}\n\n    .center {\n  text-align: center\n}\n\n.bold {\n  font-weight: 700\n}\n\n.datepicker-day-of-month,\n.datepicker-month,\n.datepicker-year {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  color: #fff;\n  cursor: pointer\n}\n\n.datepicker-selection {\n  cursor: pointer;\n}\n\n.datepicker-month,\n.datepicker-year {\n  font-size: 14px\n}\n\n.datepicker-day-of-month {\n  font-size: 60px;\n  font-weight: 700\n}\n\n.datepicker-balanced {\n  background-color: #008d7f\n}\n\n.white {\n  color: #fff\n}\n\n.datepicker-balanced-light {\n  background-color: #009688\n}\n\n.datepicker-color-balanced-light {\n  color: #009688\n}\n\n.datepicker-date-col:hover {\n  background-color: rgba(56, 126, 245, .5);\n  cursor: pointer;\n  border-radius: 20px;\n}\n\n.no-padding {\n  padding: 0\n}\n\n.datepicker-date-cell {\n  padding: 5px\n}\n\n.datepicker-selected {\n  background-color: rgba(182, 217, 214, 1);\n  border-radius:20px;\n}\n\n.datepicker-current {\n  color: rgba(60, 170, 159, 1);\n  border-radius:20px;\n}\n\n.datepicker-disabled {\n  color: rgba(170, 170, 170, 1)\n}\n\n.datepicker-disabled:hover {\n  background-color: transparent;\n  cursor: default\n}\n\n.datepicker-modal-container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0);\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  -moz-align-items: center;\n  align-items: center;\n  z-index: 12\n}\n\n.datepicker-modal-container .datepicker-modal {\n  width: 250px;\n  max-width: 100%;\n  max-height: 100%;\n  border-radius: 0;\n  background-color: rgba(255, 255, 255, .9);\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column\n}\n\n.datepicker-modal {\n  box-shadow: 1px 1px 3px #888\n}\n\n.datepicker-modal-head {\n  padding: 8px 10px;\n  text-align: center\n}\n\n.datepicker-modal-title {\n  margin: 0;\n  padding: 0;\n  font-size: 13px\n}\n\n.datepicker-modal-buttons {\n   position: absolute;\n   width: 100%;\n   bottom: 0px;\n   display: flex;\n}\n\n.datepicker-modal-buttons .button {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -moz-box-flex: 1;\n  -moz-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  display: block;\n  min-height: 45px;\n  border-radius: 2px;\n  line-height: 20px;\n  margin-right: 5px\n}\n\n.datepicker-modal-buttons .button:last-child {\n  margin-right: 0\n}\n\n.datepicker-calendar {\n  word-wrap: normal;\n}\n\n.calendar-row {\n  padding-top: 3%;\n  padding-bottom: 3%;\n  display: flex;\n  justify-content: space-around;\n}\n\n.calendar-cell {\n  height: 25px;\n  width: 25px;\n}\n    "],
        encapsulation: ViewEncapsulation.Emulated,
        providers: []
    }),
    __metadata("design:paramtypes", [ViewController, NavParams])
], DatePickerComponent);
export { DatePickerComponent };
//# sourceMappingURL=datepicker.component.js.map