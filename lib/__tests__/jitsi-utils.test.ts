import { describe, it, expect } from 'vitest';
import {
  generateJitsiUrl,
  isValidJitsiSlug,
  extractSlugFromUrl,
} from '../jitsi-utils';

describe('Jitsi Utilities', () => {
  describe('generateJitsiUrl', () => {
    it('deve gerar URL correta para slug válido', () => {
      const slug = 'reuniao-importante-2024';
      const url = generateJitsiUrl(slug);
      expect(url).toBe('https://meet.jit.si/reuniao-importante-2024');
    });

    it('deve converter slug para minúsculas', () => {
      const slug = 'REUNIAO-IMPORTANTE';
      const url = generateJitsiUrl(slug);
      expect(url).toBe('https://meet.jit.si/reuniao-importante');
    });

    it('deve remover caracteres especiais do slug', () => {
      const slug = 'reunião@importante!2024';
      const url = generateJitsiUrl(slug);
      expect(url).toBe('https://meet.jit.si/reunioimportante2024');
    });

    it('deve remover hífens duplicados', () => {
      const slug = 'reuniao--importante---2024';
      const url = generateJitsiUrl(slug);
      expect(url).toBe('https://meet.jit.si/reuniao-importante-2024');
    });

    it('deve remover hífens das extremidades', () => {
      const slug = '-reuniao-importante-';
      const url = generateJitsiUrl(slug);
      expect(url).toBe('https://meet.jit.si/reuniao-importante');
    });
  });

  describe('isValidJitsiSlug', () => {
    it('deve validar slug válido', () => {
      expect(isValidJitsiSlug('reuniao-importante-2024')).toBe(true);
    });

    it('deve validar slug com números', () => {
      expect(isValidJitsiSlug('reuniao123')).toBe(true);
    });

    it('deve rejeitar slug muito curto', () => {
      expect(isValidJitsiSlug('ab')).toBe(false);
    });

    it('deve rejeitar slug vazio', () => {
      expect(isValidJitsiSlug('')).toBe(false);
    });

    it('deve rejeitar slug com caracteres especiais', () => {
      expect(isValidJitsiSlug('reunião@importante')).toBe(false);
    });

    it('deve rejeitar slug muito longo', () => {
      const longSlug = 'a'.repeat(129);
      expect(isValidJitsiSlug(longSlug)).toBe(false);
    });
  });

  describe('extractSlugFromUrl', () => {
    it('deve extrair slug de URL válida', () => {
      const url = 'https://meet.jit.si/reuniao-importante-2024';
      const slug = extractSlugFromUrl(url);
      expect(slug).toBe('reuniao-importante-2024');
    });

    it('deve extrair slug com barras extras', () => {
      const url = 'https://meet.jit.si/reuniao-importante-2024/';
      const slug = extractSlugFromUrl(url);
      expect(slug).toBe('reuniao-importante-2024');
    });

    it('deve retornar null para URL inválida', () => {
      const slug = extractSlugFromUrl('não é uma URL');
      expect(slug).toBeNull();
    });

    it('deve retornar null para URL sem slug', () => {
      const url = 'https://meet.jit.si/';
      const slug = extractSlugFromUrl(url);
      expect(slug).toBeNull();
    });
  });
});
