import { DailyParticipant } from '@daily-co/react-native-daily-js';
import React from 'react';
/**
 * Extends DailyParticipant with convenient additional properties.
 */
export interface ExtendedDailyParticipant extends DailyParticipant {
    last_active?: Date;
}
export declare const participantsState: import("recoil").RecoilState<ExtendedDailyParticipant[]>;
/**
 * Holds each inidividual participant's state object.
 */
export declare const participantState: (param: string) => import("recoil").RecoilValueReadOnly<ExtendedDailyParticipant | null>;
export declare const DailyParticipants: React.FC<React.PropsWithChildren<{}>>;
