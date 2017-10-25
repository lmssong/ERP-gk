export declare class DateService {
    private static _local;
    locale: string;
    constructor();
    getDaysOfWeek(): string[];
    getMonths(): string[];
    getYears(): any[];
    createDateList(currentDate: Date): Date[];
}
