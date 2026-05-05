/**
 * Modelo de dados para reuniões Jitsi
 */

export interface Meeting {
  id: string; // UUID
  titulo: string;
  data_hora: string; // ISO Timestamp (ISO 8601)
  slug_jitsi: string; // Nome da sala Jitsi (ex: "reuniao-importante-2024")
  cor_hex: string; // Cor em formato hex (ex: "#4285F4")
  concluida: boolean; // Status de conclusão
  cancelada: boolean; // Status de cancelamento (movida para histórico)
  data_cancelamento?: string; // Data de cancelamento (ISO 8601)
}

export interface MeetingContextType {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, meeting: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  cancelMeeting: (id: string) => void; // Cancelar e mover para histórico
  toggleMeetingStatus: (id: string) => void;
  getMeetingById: (id: string) => Meeting | undefined;
}

export interface FilterState {
  searchQuery: string;
  selectedColor: string | null;
}
