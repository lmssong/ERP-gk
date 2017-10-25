var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DatePickerController } from './datepicker.modal';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './datepicker.component';
import { DatePickerDirective } from './datepicker.directive';
var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    return DatePickerModule;
}());
DatePickerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            BrowserModule
        ],
        exports: [
            DatePickerComponent,
            DatePickerDirective
        ],
        entryComponents: [DatePickerComponent],
        declarations: [DatePickerComponent, DatePickerDirective],
        providers: [
            DatePickerController
        ],
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA
        ]
    })
], DatePickerModule);
export { DatePickerModule };
;
//# sourceMappingURL=datepicker.module.js.map