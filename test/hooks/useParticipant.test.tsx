/// <reference types="@types/jest" />

import DailyIframe, {
  DailyCall,
  DailyEvent,
  DailyEventObjectParticipant,
} from '@daily-co/react-native-daily-js';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { DailyProvider } from '../../src/DailyProvider';
import { useParticipant } from '../../src/hooks/useParticipant';

jest.mock('../../src/DailyRoom', () => ({
  DailyRoom: (({ children }) => <>{children}</>) as React.FC,
}));

const createWrapper = (
  callObject: DailyCall = DailyIframe.createCallObject()
): React.FC => ({ children }) => (
  <DailyProvider callObject={callObject}>{children}</DailyProvider>
);

describe('useParticipant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('returns participant identified by given session_id', async () => {
    const daily = DailyIframe.createCallObject();
    const { result, waitFor } = renderHook(() => useParticipant('a'), {
      wrapper: createWrapper(daily),
    });
    const participant = {
      session_id: 'a',
      user_name: 'Alpha',
    };
    act(() => {
      // @ts-ignore
      daily.emit('participant-joined', {
        action: 'participant-joined',
        participant,
      });
    });
    await waitFor(() => {
      expect(result.current).toEqual(participant);
    });
  });
  it('participant-updated calls onParticipantUpdated', async () => {
    const daily = DailyIframe.createCallObject();
    const onParticipantUpdated = jest.fn();
    const { waitFor } = renderHook(
      () => useParticipant('a', { onParticipantUpdated }),
      {
        wrapper: createWrapper(daily),
      }
    );
    const event: DailyEvent = 'participant-updated';
    const payload: DailyEventObjectParticipant = {
      action: event,
      // @ts-ignore
      participant: {
        session_id: 'a',
        user_name: 'Beta',
      },
    };
    act(() => {
      // @ts-ignore
      daily.emit(event, payload);
    });
    await waitFor(() => {
      expect(onParticipantUpdated).toBeCalledWith(payload);
    });
  });
  it('participant-left event calls onParticipantLeft', async () => {
    const daily = DailyIframe.createCallObject();
    const onParticipantLeft = jest.fn();
    const { waitFor } = renderHook(
      () => useParticipant('a', { onParticipantLeft }),
      {
        wrapper: createWrapper(daily),
      }
    );
    const event: DailyEvent = 'participant-left';
    const payload: DailyEventObjectParticipant = {
      action: event,
      // @ts-ignore
      participant: {
        session_id: 'a',
        user_name: 'Alpha',
      },
    };
    act(() => {
      // @ts-ignore
      daily.emit(event, payload);
    });
    await waitFor(() => {
      expect(onParticipantLeft).toBeCalledWith(payload);
    });
  });
});
