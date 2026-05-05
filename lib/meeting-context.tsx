import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meeting, MeetingContextType } from './types';
import { mockMeetings } from './mock-data';

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

type MeetingAction =
  | { type: 'SET_MEETINGS'; payload: Meeting[] }
  | { type: 'ADD_MEETING'; payload: Meeting }
  | { type: 'UPDATE_MEETING'; payload: { id: string; meeting: Partial<Meeting> } }
  | { type: 'DELETE_MEETING'; payload: string }
  | { type: 'TOGGLE_STATUS'; payload: string };

interface MeetingState {
  meetings: Meeting[];
}

const initialState: MeetingState = {
  meetings: mockMeetings,
};

function meetingReducer(state: MeetingState, action: MeetingAction): MeetingState {
  switch (action.type) {
    case 'SET_MEETINGS':
      return { meetings: action.payload };

    case 'ADD_MEETING':
      return { meetings: [...state.meetings, action.payload] };

    case 'UPDATE_MEETING': {
      const { id, meeting } = action.payload;
      return {
        meetings: state.meetings.map((m) =>
          m.id === id ? { ...m, ...meeting } : m
        ),
      };
    }

    case 'DELETE_MEETING':
      return {
        meetings: state.meetings.filter((m) => m.id !== action.payload),
      };

    case 'TOGGLE_STATUS': {
      const id = action.payload;
      return {
        meetings: state.meetings.map((m) =>
          m.id === id ? { ...m, concluida: !m.concluida } : m
        ),
      };
    }

    default:
      return state;
  }
}

export function MeetingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(meetingReducer, initialState);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Carregar dados do AsyncStorage ao montar
  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const stored = await AsyncStorage.getItem('meetings');
        if (stored) {
          const meetings = JSON.parse(stored);
          dispatch({ type: 'SET_MEETINGS', payload: meetings });
        }
      } catch (error) {
        console.error('Erro ao carregar reuniões:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadMeetings();
  }, []);

  // Salvar dados no AsyncStorage sempre que mudar
  useEffect(() => {
    if (isLoaded) {
      const saveMeetings = async () => {
        try {
          await AsyncStorage.setItem('meetings', JSON.stringify(state.meetings));
        } catch (error) {
          console.error('Erro ao salvar reuniões:', error);
        }
      };

      saveMeetings();
    }
  }, [state.meetings, isLoaded]);

  const value: MeetingContextType = {
    meetings: state.meetings,
    addMeeting: (meeting) => dispatch({ type: 'ADD_MEETING', payload: meeting }),
    updateMeeting: (id, meeting) =>
      dispatch({ type: 'UPDATE_MEETING', payload: { id, meeting } }),
    deleteMeeting: (id) => dispatch({ type: 'DELETE_MEETING', payload: id }),
    toggleMeetingStatus: (id) => dispatch({ type: 'TOGGLE_STATUS', payload: id }),
    getMeetingById: (id) => state.meetings.find((m) => m.id === id),
  };

  return (
    <MeetingContext.Provider value={value}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeetings(): MeetingContextType {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeetings deve ser usado dentro de MeetingProvider');
  }
  return context;
}
