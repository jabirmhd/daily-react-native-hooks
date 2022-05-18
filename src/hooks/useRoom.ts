import { DailyRoomInfo } from '@daily-co/react-native-daily-js';
import { useRecoilValue } from 'recoil';

import { roomState } from '../DailyRoom';

/**
 * Stateful hook to work with room, domain and token configuration for a daily room.
 * Includes room default values.
 */
export const useRoom = (): DailyRoomInfo | null => {
  const room = useRecoilValue(roomState);
  return room;
};
