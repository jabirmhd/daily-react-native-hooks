import { DailyParticipant } from '@daily-co/react-native-daily-js';
declare type MediaType = keyof DailyParticipant['tracks'];
/**
 * Returns a participant's track and state, based on the given MediaType.
 *
 * Equivalent to daily.participants()[participantId].tracks[type].
 *
 * @param participantId The participant's session_id.
 * @param type The track type. Default: "video"
 */
export declare const useMediaTrack: (participantId: string, type?: MediaType) => {
    isOff: boolean;
    subscribed: import("@daily-co/react-native-daily-js").DailyTrackSubscriptionState;
    state: "blocked" | "off" | "sendable" | "loading" | "interrupted" | "playable";
    blocked?: {
        byDeviceMissing?: boolean | undefined;
        byDeviceInUse?: boolean | undefined;
        byPermissions?: boolean | undefined;
    } | undefined;
    off?: {
        byUser?: boolean | undefined;
        byRemoteRequest?: boolean | undefined;
        byBandwidth?: boolean | undefined;
    } | undefined;
    track?: import("@daily-co/react-native-webrtc").MediaStreamTrack | undefined;
};
export {};
