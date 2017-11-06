export declare module nls {
    const _nls: any;
    function getWeekdays(locale: languages): string[];
    function getMonths(locale: languages): string[];
    function getNls(locale: languages): {
        weekdays: string[];
        months: string[];
    };
    function checkExists(locale: string): boolean;
}
export declare type languages = string | 'en-US' | 'pt-BR' | 'he-IL' | 'ru-RU' | 'de' | 'fi';
