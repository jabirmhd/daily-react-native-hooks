import { DailyEventObjectNonFatalError } from '@daily-co/react-native-daily-js';
interface UseInputSettingsArgs {
    onError?(ev: DailyEventObjectNonFatalError): void;
}
export declare const useInputSettings: ({}?: UseInputSettingsArgs) => {
    errorMsg: string | null;
};
export {};
