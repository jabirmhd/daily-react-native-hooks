import {
  DailyEventObjectNetworkConnectionEvent,
  DailyEventObjectNetworkQualityEvent,
  DailyNetworkConnectionType,
  DailyNetworkStats,
} from '@daily-co/react-native-daily-js';
import { useCallback } from 'react';
import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

import { useDaily } from './useDaily';
import { useDailyEvent } from './useDailyEvent';

interface UseNetworkArgs {
  onNetworkConnection?(ev: DailyEventObjectNetworkConnectionEvent): void;
  onNetworkQualityChange?(ev: DailyEventObjectNetworkQualityEvent): void;
}

const topologyState = atom<DailyNetworkConnectionType>({
  key: 'topology',
  default: 'peer-to-peer',
});
const networkQualityState = atom<DailyNetworkStats['quality']>({
  key: 'networkQuality',
  default: 100,
});
const networkThresholdState = atom<DailyNetworkStats['threshold']>({
  key: 'networkThreshold',
  default: 'good',
});

/**
 * Returns current information about network quality and topology.
 * Allows to setup event listeners for daily's [network events](https://docs.daily.co/reference/daily-js/events/network-events).
 */
export const useNetwork = ({
  onNetworkConnection,
  onNetworkQualityChange,
}: UseNetworkArgs = {}) => {
  const daily = useDaily();

  const topology = useRecoilValue(topologyState);
  const quality = useRecoilValue(networkQualityState);
  const threshold = useRecoilValue(networkThresholdState);

  const handleNetworkConnection = useRecoilCallback(
    ({ transact_UNSTABLE }) => (ev: DailyEventObjectNetworkConnectionEvent) => {
      transact_UNSTABLE(({ set }) => {
        switch (ev.event) {
          case 'connected':
            if (ev.type === 'peer-to-peer') set(topologyState, 'peer-to-peer');
            if (ev.type === 'sfu') set(topologyState, 'sfu');
            break;
        }
      });
      setTimeout(() => onNetworkConnection?.(ev), 0);
    },
    [onNetworkConnection]
  );

  const handleNetworkQualityChange = useRecoilCallback(
    ({ transact_UNSTABLE }) => (ev: DailyEventObjectNetworkQualityEvent) => {
      transact_UNSTABLE(({ set }) => {
        set(networkQualityState, prevQuality =>
          prevQuality !== ev.quality ? ev.quality : prevQuality
        );
        set(
          networkThresholdState,
          prevThreshold =>
            (prevThreshold !== ev.threshold
              ? ev.threshold
              : prevThreshold) as DailyNetworkStats['threshold']
        );
      });
      setTimeout(() => onNetworkQualityChange?.(ev), 0);
    },
    [onNetworkQualityChange]
  );

  useDailyEvent('network-connection', handleNetworkConnection);
  useDailyEvent('network-quality-change', handleNetworkQualityChange);

  const getStats = useCallback(async () => {
    const newStats = await daily?.getNetworkStats();
    return newStats?.stats;
  }, [daily]);

  return {
    getStats,
    quality,
    threshold,
    topology,
  };
};
