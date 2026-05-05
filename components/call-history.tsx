import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Meeting } from '@/lib/types';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';
import { formatMeetingDate, formatMeetingTime } from '@/lib/use-filtered-meetings';

interface CallHistoryProps {
  pastMeetings: Meeting[];
  onMeetingPress?: (meeting: Meeting) => void;
}

export function CallHistory({ pastMeetings, onMeetingPress }: CallHistoryProps) {
  const colors = useColors();

  if (pastMeetings.length === 0) {
    return (
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: colors.surface,
          },
        ]}
      >
        <Ionicons name="timer" size={32} color={colors.muted} />
        <Text
          style={[
            styles.emptyText,
            {
              color: colors.muted,
            },
          ]}
        >
          Nenhuma chamada anterior
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: colors.foreground,
          },
        ]}
      >
        HISTÓRICO DE CHAMADAS
      </Text>

      <FlatList
        data={pastMeetings}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onMeetingPress?.(item)}
            style={({ pressed }) => [
              styles.historyItem,
              {
                backgroundColor: colors.surface,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.colorBorder,
                {
                  backgroundColor: item.cor_hex,
                },
              ]}
            />
            <View style={styles.itemContent}>
              <Text
                style={[
                  styles.itemTitle,
                  {
                    color: colors.foreground,
                  },
                ]}
                numberOfLines={1}
              >
                {item.titulo}
              </Text>
              <Text
                style={[
                  styles.itemTime,
                  {
                    color: colors.muted,
                  },
                ]}
              >
                {formatMeetingDate(item.data_hora)} •{' '}
                {formatMeetingTime(item.data_hora)}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.muted}
            />
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 12,
  },
  colorBorder: {
    width: 4,
    height: 48,
    borderRadius: 2,
  },
  itemContent: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemTime: {
    fontSize: 12,
    fontWeight: '400',
  },
});
