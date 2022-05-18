import { DailyEvent, DailyEventObject } from '@daily-co/react-native-daily-js';
declare type EventCallback = (event?: DailyEventObject) => void;
export declare const getUnique: () => number;
/**
 * Sets up a daily event listener using [on](https://docs.daily.co/reference/daily-js/instance-methods/on) method.
 * When this hook is unmounted the event listener is unregistered using [off](https://docs.daily.co/reference/daily-js/instance-methods/off).
 *
 * Warning: callback has to be a memoized reference (e.g. via [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)).
 * Otherwise a console error might be thrown indicating a re-render loop issue.
 *
 * @param ev The DailyEvent to register.
 * @param callback A memoized callback reference to run when the event is emitted.
 */
export declare const useDailyEvent: (ev: DailyEvent, callback: EventCallback) => void;
export {};
