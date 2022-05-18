import { DailyEvent } from '@daily-co/react-native-daily-js';
import { createContext } from 'react';

interface EventContextValue {
  on(ev: DailyEvent, callback: Function, key: number): void;
  off(ev: DailyEvent, key: number): void;
}

export const DailyEventContext = createContext<EventContextValue>({
  on: () => {},
  off: () => {},
});
