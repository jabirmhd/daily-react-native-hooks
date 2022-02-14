import { DailyPendingRoomInfo, DailyRoomInfo } from '@daily-co/daily-js';
import { atom, useRecoilCallback, useRecoilValue } from 'recoil';

import { useDaily } from './useDaily';
import { useDailyEvent } from './useDailyEvent';

const roomState = atom<DailyPendingRoomInfo | DailyRoomInfo | null>({
  key: 'room',
  default: null,
});

interface UseRoomArgs {
  includeRoomConfigDefaults: boolean;
}

/**
 * Stateful hook to work with room, domain and token configuration for a daily room.
 * Accepts same arguments as [room()](https://docs.daily.co/reference/daily-js/instance-methods/room).
 */
export const useRoom = (options?: UseRoomArgs) => {
  const room = useRecoilValue(roomState);
  const daily = useDaily();

  const updateRoom = useRecoilCallback(
    ({ set }) =>
      async () => {
        if (!daily) return;
        set(roomState, await daily.room(options));
      },
    [daily, options]
  );

  useDailyEvent('loaded', updateRoom);
  useDailyEvent('started-camera', updateRoom);
  useDailyEvent('joining-meeting', updateRoom);
  useDailyEvent('joined-meeting', updateRoom);

  return room;
};
