import {
  DailyEventObjectNonFatalError,
  // DailyInputSettings,
} from '@daily-co/react-native-daily-js';
import { atom, useRecoilValue } from 'recoil';

// import { useDaily } from './useDaily';

interface UseInputSettingsArgs {
  onError?(ev: DailyEventObjectNonFatalError): void;
  // onInputSettingsUpdated?(ev: DailyEventObjectInputSettingsUpdated): void;
}

// const inputSettingsState = atom<DailyInputSettings | null>({
//   key: 'input-settings',
//   default: null,
// });
const errorState = atom<string | null>({
  key: 'input-settings-error',
  default: null,
});

// eslint-disable-next-line no-empty-pattern
export const useInputSettings = ({}: // onError,
// onInputSettingsUpdated,
UseInputSettingsArgs = {}) => {
  // const inputSettings = useRecoilValue(inputSettingsState);
  const errorMsg = useRecoilValue(errorState);
  // const daily = useDaily();

  // const updateInputSettingsState = useRecoilCallback(
  //   ({ set }) => (inputSettings: DailyInputSettings) => {
  //     set(inputSettingsState, inputSettings);
  //   },
  //   []
  // );

  // useEffect(() => {
  //   if (!daily) return;
  //   daily.getInputSettings().then(updateInputSettingsState);
  // }, [daily, updateInputSettingsState]);

  /**
   * Handle 'input-settings-updated' events.
   */
  // useDailyEvent(
  //   'input-settings-updated',
  //   useCallback(
  //     (ev: DailyEventObjectInputSettingsUpdated) => {
  //       updateInputSettingsState(ev.inputSettings);
  //       setTimeout(() => onInputSettingsUpdated?.(ev), 0);
  //     },
  //     [onInputSettingsUpdated, updateInputSettingsState]
  //   )
  // );

  /**
   * Handle nonfatal errors of type 'input-settings-error'.
   */
  // useDailyEvent(
  //   'nonfatal-error',
  //   useRecoilCallback(
  //     ({ set }) => (ev: DailyEventObjectNonFatalError) => {
  //       if (ev.type !== 'input-settings-error') return;
  //       set(errorState, ev.errorMsg);
  //       setTimeout(() => onError?.(ev), 0);
  //     },
  //     [onError]
  //   )
  // );

  /**
   * Calls daily.updateInputSettings internally.
   */
  // const updateInputSettings = useCallback(
  //   (inputSettings: DailyInputSettings) => {
  //     daily?.updateInputSettings(inputSettings);
  //   },
  //   [daily]
  // );

  return {
    errorMsg,
    // inputSettings,
    // updateInputSettings,
  };
};
