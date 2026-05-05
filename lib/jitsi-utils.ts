/**
 * Utilitários para integração com Jitsi Meet
 */

const JITSI_BASE_URL = 'https://meet.jit.si';

/**
 * Gera a URL completa para uma reunião Jitsi
 * @param slug - Nome da sala (ex: "reuniao-importante-2024")
 * @returns URL completa (ex: "https://meet.jit.si/reuniao-importante-2024")
 */
export function generateJitsiUrl(slug: string): string {
  // Sanitizar slug: remover caracteres especiais, converter para minúsculas
  const sanitized = slug
    .toLowerCase()
    .replace(/[^\w-]/g, '') // Remover caracteres especiais
    .replace(/--+/g, '-') // Remover hífens duplicados
    .replace(/^-+|-+$/g, ''); // Remover hífens das extremidades

  return `${JITSI_BASE_URL}/${sanitized}`;
}

/**
 * Abre uma reunião Jitsi via deep link ou WebView
 * @param slug - Nome da sala Jitsi
 * @param displayName - Nome do participante (opcional)
 */
export async function openJitsiMeeting(
  slug: string,
  displayName?: string
): Promise<void> {
  try {
    const url = generateJitsiUrl(slug);

    // Adicionar nome do participante como parâmetro se fornecido
    const urlWithParams = displayName
      ? `${url}?displayName=${encodeURIComponent(displayName)}`
      : url;

    // Tentar abrir via deep link primeiro (para aplicativos nativos)
    // Se falhar, usar WebView (fallback)
    try {
      // Importar dinamicamente para evitar erros em ambiente web
      const { Linking } = await import('react-native');
      const canOpen = await Linking.canOpenURL(urlWithParams);

      if (canOpen) {
        await Linking.openURL(urlWithParams);
      } else {
        // Fallback: abrir no navegador padrão
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Erro ao abrir Jitsi:', error);
      // Fallback final: apenas logar o erro
      throw new Error('Não foi possível abrir a reunião Jitsi');
    }
  } catch (error) {
    console.error('Erro ao processar URL Jitsi:', error);
    throw error;
  }
}

/**
 * Valida se um slug é válido para Jitsi
 * @param slug - Slug a validar
 * @returns true se válido, false caso contrário
 */
export function isValidJitsiSlug(slug: string): boolean {
  // Jitsi aceita: letras, números, hífens
  // Mínimo 3 caracteres, máximo 128
  const regex = /^[a-zA-Z0-9-]{3,128}$/;
  return regex.test(slug);
}

/**
 * Extrai o slug de uma URL Jitsi completa
 * @param url - URL completa (ex: "https://meet.jit.si/reuniao-importante")
 * @returns slug (ex: "reuniao-importante")
 */
export function extractSlugFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.replace(/^\/+|\/+$/g, ''); // Remove barras
    return pathname || null;
  } catch {
    return null;
  }
}
