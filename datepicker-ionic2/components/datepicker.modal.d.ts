import { App, ModalOptions, NavOptions, ViewController } from 'ionic-angular';
export declare class DatePickerDisplayer extends ViewController {
    private _app;
    private _enterAnimation;
    private _leaveAnimation;
    constructor(app: App, data: any);
    getTransitionName(direction: string): string;
    present(navOptions?: NavOptions): Promise<any>;
}
export declare class DatePickerController {
    private _app;
    constructor(_app: App);
    create(data?: any, opts?: ModalOptions): DatePickerDisplayer;
}
