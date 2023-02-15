import { DailyEventObject, DailyEventObjectGenericError, DailyEventObjectLiveStreamingStarted, DailyLiveStreamingOptions, DailyStreamingLayoutConfig } from '@daily-co/react-native-daily-js';
interface UseLiveStreamingArgs {
    onLiveStreamingStarted?(ev: DailyEventObjectLiveStreamingStarted): void;
    onLiveStreamingStopped?(ev: DailyEventObject): void;
    onLiveStreamingError?(ev: DailyEventObjectGenericError): void;
}
/**
 * This hook allows to setup [live streaming events](https://docs.daily.co/reference/daily-js/events/live-streaming-events),
 * as well as starting, stopping and updating live streams.
 *
 * Returns the current live streaming state, incl. the current layout and potential errorMsg.
 */
export declare const useLiveStreaming: ({ onLiveStreamingStarted, onLiveStreamingStopped, onLiveStreamingError, }?: UseLiveStreamingArgs) => {
    startLiveStreaming: (options: DailyLiveStreamingOptions) => void;
    stopLiveStreaming: () => void;
    updateLiveStreaming: ({ layout }: {
        layout: DailyStreamingLayoutConfig | undefined;
    }) => void;
    errorMsg?: string | undefined;
    isLiveStreaming: boolean;
    layout?: import("@daily-co/react-native-daily-js").DailyStreamingDefaultLayoutConfig | import("@daily-co/react-native-daily-js").DailyStreamingSingleParticipantLayoutConfig | import("@daily-co/react-native-daily-js").DailyStreamingActiveParticipantLayoutConfig | import("@daily-co/react-native-daily-js").DailyStreamingPortraitLayoutConfig | import("@daily-co/react-native-daily-js").DailyStreamingCustomLayoutConfig | undefined;
};
export {};
