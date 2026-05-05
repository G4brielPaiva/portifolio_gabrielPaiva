import { Meeting } from './types';

/**
 * Dados fictícios de reuniões para demonstração
 * Inclui 5 reuniões distribuídas em diferentes datas
 */

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

const twoWeeksLater = new Date(today);
twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

const threeWeeksLater = new Date(today);
threeWeeksLater.setDate(threeWeeksLater.getDate() + 21);

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    titulo: 'Reunião de Planejamento Q2',
    data_hora: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0).toISOString(),
    slug_jitsi: 'reuniao-planejamento-q2-2024',
    cor_hex: '#4285F4', // Azul
    concluida: false,
    cancelada: false,
  },
  {
    id: '2',
    titulo: 'Revisão de Código - Frontend',
    data_hora: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30, 0).toISOString(),
    slug_jitsi: 'revisao-codigo-frontend',
    cor_hex: '#34A853', // Verde
    concluida: false,
    cancelada: false,
  },
  {
    id: '3',
    titulo: 'Standup Daily',
    data_hora: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0, 0).toISOString(),
    slug_jitsi: 'standup-daily-2024',
    cor_hex: '#FBBC04', // Amarelo
    concluida: false,
    cancelada: false,
  },
  {
    id: '4',
    titulo: 'Apresentação para Stakeholders',
    data_hora: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 15, 0, 0).toISOString(),
    slug_jitsi: 'apresentacao-stakeholders',
    cor_hex: '#EA4335', // Vermelho
    concluida: false,
    cancelada: false,
  },
  {
    id: '5',
    titulo: 'Retrospectiva do Sprint',
    data_hora: new Date(twoWeeksLater.getFullYear(), twoWeeksLater.getMonth(), twoWeeksLater.getDate(), 16, 30, 0).toISOString(),
    slug_jitsi: 'retrospectiva-sprint',
    cor_hex: '#A142F4', // Roxo
    concluida: false,
    cancelada: false,
  },
];

/**
 * Paleta de cores disponíveis para categorias de reunião
 */
export const MEETING_COLORS = [
  '#4285F4', // Azul
  '#EA4335', // Vermelho
  '#FBBC04', // Amarelo
  '#34A853', // Verde
  '#A142F4', // Roxo
  '#FF6D00', // Laranja
];

/**
 * Mapeamento de cores para nomes descritivos
 */
export const COLOR_NAMES: { [key: string]: string } = {
  '#4285F4': 'Azul',
  '#EA4335': 'Vermelho',
  '#FBBC04': 'Amarelo',
  '#34A853': 'Verde',
  '#A142F4': 'Roxo',
  '#FF6D00': 'Laranja',
};

/**
 * Obter nome da cor a partir do valor hex
 */
export function getColorName(hexColor: string): string {
  return COLOR_NAMES[hexColor] || 'Sem categoria';
}

/**
 * Obter cor padrão (primeira cor da paleta)
 */
export function getDefaultColor(): string {
  return MEETING_COLORS[0];
}

/**
 * Função auxiliar para gerar um slug único para a reunião
 */
export function generateMeetingSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}
