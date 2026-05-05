import { useMemo } from 'react';
import { Meeting } from './types';

interface UseFilteredMeetingsProps {
  meetings: Meeting[];
  searchQuery: string;
  selectedColor: string | null;
}

interface GroupedMeetings {
  [key: string]: Meeting[];
}

/**
 * Agrupa reuniões por data em ordem decrescente (próximas primeiro)
 */
function groupMeetingsByDate(meetings: Meeting[]): GroupedMeetings {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const groups: GroupedMeetings = {
    'Hoje': [],
    'Amanhã': [],
    'Próximas': [],
  };

  meetings.forEach((meeting) => {
    const meetingDate = new Date(meeting.data_hora);
    meetingDate.setHours(0, 0, 0, 0);

    if (meetingDate.getTime() === today.getTime()) {
      groups['Hoje'].push(meeting);
    } else if (meetingDate.getTime() === tomorrow.getTime()) {
      groups['Amanhã'].push(meeting);
    } else if (meetingDate > today) {
      groups['Próximas'].push(meeting);
    }
  });

  // Ordenar dentro de cada grupo por hora
  Object.keys(groups).forEach((key) => {
    groups[key].sort((a, b) => {
      const timeA = new Date(a.data_hora).getTime();
      const timeB = new Date(b.data_hora).getTime();
      return timeA - timeB;
    });
  });

  return groups;
}

/**
 * Hook para filtrar e agrupar reuniões
 * Filtra por busca de texto e cor, depois agrupa por data
 */
export function useFilteredMeetings({
  meetings,
  searchQuery,
  selectedColor,
}: UseFilteredMeetingsProps): GroupedMeetings {
  return useMemo(() => {
    // Aplicar filtros
    let filtered = meetings.filter((meeting) => {
      const matchesSearch =
        searchQuery === '' ||
        meeting.titulo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesColor =
        selectedColor === null || meeting.cor_hex === selectedColor;

      return matchesSearch && matchesColor;
    });

    // Agrupar por data
    return groupMeetingsByDate(filtered);
  }, [meetings, searchQuery, selectedColor]);
}

/**
 * Função auxiliar para formatar data em formato legível
 */
export function formatMeetingDate(isoString: string): string {
  const date = new Date(isoString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const meetingDate = new Date(date);
  meetingDate.setHours(0, 0, 0, 0);

  if (meetingDate.getTime() === today.getTime()) {
    return 'Hoje';
  } else if (meetingDate.getTime() === tomorrow.getTime()) {
    return 'Amanhã';
  } else {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    });
  }
}

/**
 * Função auxiliar para formatar hora
 */
export function formatMeetingTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
