/**
 * Returns a participant's audio track and state.
 * @param participantId The participant's session_id.
 */
export declare const useAudioTrack: (participantId: string) => {
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
