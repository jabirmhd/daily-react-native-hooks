import { DailyCall, DailyCallOptions } from '@daily-co/react-native-daily-js';
import React from 'react';
declare type DailyProperties = Pick<DailyCallOptions, 'audioSource' | 'reactNativeConfig'>;
declare type Props = DailyProperties | {
    callObject: DailyCall;
};
export declare const DailyProvider: React.FC<React.PropsWithChildren<Props>>;
export {};
