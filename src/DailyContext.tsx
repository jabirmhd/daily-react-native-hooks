import { DailyCall } from '@daily-co/react-native-daily-js';
import { createContext } from 'react';

export const DailyContext = createContext<DailyCall | null>(null);
