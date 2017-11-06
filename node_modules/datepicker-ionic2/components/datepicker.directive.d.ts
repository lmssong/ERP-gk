import { ModalOptions } from 'ionic-angular';
import { EventEmitter } from "@angular/core";
import { DatePickerController, DatePickerDisplayer } from './datepicker.modal';
import { DateService } from './datepicker.service';
export declare class DatePickerDirective {
    datepickerCtrl: DatePickerController;
    changed: EventEmitter<string | Date>;
    canceled: EventEmitter<void>;
    max: Date;
    min: Date;
    calendar: boolean;
    locale: string;
    full: boolean;
    okText: string;
    cancelText: string;
    dclasses: Array<string>;
    hclasses: Array<string>;
    modalOptions: ModalOptions;
    value: Date;
    dateSelected: EventEmitter<string | Date>;
    modal: DatePickerDisplayer;
    dateService: DateService;
    private _fn;
    constructor(datepickerCtrl: DatePickerController);
    _click(ev: UIEvent): void;
    open(): void;
}
