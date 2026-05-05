import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Pressable, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';
import { generateJitsiUrl } from '@/lib/jitsi-utils';

interface JitsiWebViewProps {
  slug: string;
  displayName?: string;
  onClose: () => void;
}

export function JitsiWebView({
  slug,
  displayName,
  onClose,
}: JitsiWebViewProps) {
  const colors = useColors();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const jitsiUrl = generateJitsiUrl(slug);

  // Construir URL com parâmetros
  const urlWithParams = displayName
    ? `${jitsiUrl}?displayName=${encodeURIComponent(displayName)}`
    : jitsiUrl;

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = (error: any) => {
    setError('Erro ao carregar a reunião. Verifique sua conexão.');
    setIsLoading(false);
    console.error('WebView error:', error);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header com botão de fechar */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.foreground,
            },
          ]}
          numberOfLines={1}
        >
          {slug}
        </Text>
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [
            styles.closeButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Ionicons name="close" size={24} color={colors.foreground} />
        </Pressable>
      </View>

      {/* WebView */}
      {!error ? (
        <>
          <WebView
            source={{ uri: urlWithParams }}
            style={styles.webview}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            allowsFullscreenVideo={true}
            mediaPlaybackRequiresUserAction={false}
          />
          {isLoading && (
            <View
              style={[
                styles.loadingContainer,
                { backgroundColor: colors.background },
              ]}
            >
              <ActivityIndicator
                size="large"
                color={colors.primary}
              />
            </View>
          )}
        </>
      ) : (
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={colors.error}
            style={styles.errorIcon}
          />
          <Text
            style={[
              styles.errorText,
              {
                color: colors.foreground,
              },
            ]}
          >
            {error}
          </Text>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.retryButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={styles.retryButtonText}>Voltar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorIcon: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
