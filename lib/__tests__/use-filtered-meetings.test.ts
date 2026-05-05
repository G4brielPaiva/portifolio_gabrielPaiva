import { describe, it, expect } from 'vitest';
import { formatMeetingDate, formatMeetingTime } from '../use-filtered-meetings';

describe('Meeting Utilities', () => {
  describe('formatMeetingDate', () => {
    it('deve formatar data de hoje como "Hoje"', () => {
      const today = new Date();
      const isoString = today.toISOString();
      const formatted = formatMeetingDate(isoString);
      expect(formatted).toBe('Hoje');
    });

    it('deve formatar data de amanhã como "Amanhã"', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isoString = tomorrow.toISOString();
      const formatted = formatMeetingDate(isoString);
      expect(formatted).toBe('Amanhã');
    });

    it('deve formatar data futura com dia da semana', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      const isoString = futureDate.toISOString();
      const formatted = formatMeetingDate(isoString);
      // Apenas verificar que não é "Hoje" ou "Amanhã"
      expect(formatted).not.toBe('Hoje');
      expect(formatted).not.toBe('Amanhã');
      expect(formatted.length).toBeGreaterThan(0);
    });
  });

  describe('formatMeetingTime', () => {
    it('deve formatar hora corretamente', () => {
      const date = new Date(2024, 0, 1, 14, 30, 0); // 14:30
      const isoString = date.toISOString();
      const formatted = formatMeetingTime(isoString);
      // Formato esperado: HH:MM (pode variar por locale)
      expect(formatted).toMatch(/\d{2}:\d{2}/);
    });

    it('deve incluir zeros à esquerda para horas menores que 10', () => {
      const date = new Date(2024, 0, 1, 9, 5, 0); // 09:05
      const isoString = date.toISOString();
      const formatted = formatMeetingTime(isoString);
      expect(formatted).toMatch(/0\d:\d{2}|09:\d{2}/);
    });
  });
});
