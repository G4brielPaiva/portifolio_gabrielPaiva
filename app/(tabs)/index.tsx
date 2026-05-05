import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { SearchBar } from '@/components/search-bar';
import { ColorFilter } from '@/components/color-filter';
import { MeetingList } from '@/components/meeting-list';
import { CallHistory } from '@/components/call-history';
import { useMeetings } from '@/lib/meeting-context';
import { useFilteredMeetings } from '@/lib/use-filtered-meetings';
import { Meeting } from '@/lib/types';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';
import { generateJitsiUrl } from '@/lib/jitsi-utils';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { meetings } = useMeetings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Filtrar e agrupar reuniões
  const groupedMeetings = useFilteredMeetings({
    meetings,
    searchQuery,
    selectedColor,
  });

  const handleMeetingPress = useCallback((meeting: Meeting) => {
    // TODO: Navegar para tela de detalhes da reunião
    // Por enquanto, apenas abrir a reunião
    const jitsiUrl = generateJitsiUrl(meeting.slug_jitsi);
    
    Linking.openURL(jitsiUrl).catch((error) => {
      console.error('Erro ao abrir Jitsi:', error);
      Alert.alert(
        'Erro',
        'Não foi possível abrir a reunião. Verifique sua conexão com a internet.',
        [{ text: 'OK' }]
      );
    });
  }, []);


  const handlePlayPress = useCallback((meeting: Meeting) => {
    const jitsiUrl = generateJitsiUrl(meeting.slug_jitsi);
    
    Linking.openURL(jitsiUrl).catch((error) => {
      console.error('Erro ao abrir Jitsi:', error);
      Alert.alert(
        'Erro',
        'Não foi possível abrir a reunião. Verifique sua conexão com a internet.',
        [{ text: 'OK' }]
      );
    });
  }, []);

  const handleMeetingLongPress = useCallback((meeting: Meeting) => {
    // Abrir menu de opções (editar, deletar, etc.)
    Alert.alert(
      meeting.titulo,
      'O que deseja fazer?',
      [
        {
          text: 'Editar',
          onPress: () => router.push(`/create-meeting?id=${meeting.id}`),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  }, [router]);

  // Separar reuniões futuras de passadas
  const now = new Date();
  const pastMeetings = meetings.filter(
    (m) => new Date(m.data_hora) < now
  ).sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime());

  const { deleteMeeting } = useMeetings();

  const handleDeleteMeeting = useCallback((meeting: Meeting) => {
    Alert.alert(
      'Cancelar Reunião',
      `Tem certeza que deseja cancelar "${meeting.titulo}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            deleteMeeting(meeting.id);
          },
        },
      ]
    );
  }, [deleteMeeting]);

  return (
    <ScreenContainer
      className="flex-1"
      containerClassName="bg-background"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.foreground,
              },
            ]}
          >
            Reuniões
          </Text>
          <View style={styles.headerActions}>
            <Pressable
              onPress={() => router.push('/create-meeting')}
              style={({ pressed }) => [
                styles.addButton,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Ionicons name="add" size={24} color={colors.foreground} />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.settingsButton,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Ionicons name="settings-outline" size={24} color={colors.foreground} />
            </Pressable>
          </View>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar reunião..."
        />

        {/* Color Filter */}
        <ColorFilter
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />

        {/* Meeting List */}
        <MeetingList
          groupedMeetings={groupedMeetings}
          onMeetingPress={handleMeetingPress}
          onPlayPress={handlePlayPress}
          onLongPress={handleMeetingLongPress}
          onDeletePress={handleDeleteMeeting}
        />

        {/* Call History */}
        <CallHistory
          pastMeetings={pastMeetings}
          onMeetingPress={handleMeetingPress}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    padding: 8,
  },
  settingsButton: {
    padding: 8,
  },
});
