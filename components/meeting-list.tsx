import React from 'react';
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { Meeting } from '@/lib/types';
import { MeetingItem } from './meeting-item';
import { DateHeader } from './date-header';
import { useColors } from '@/hooks/use-colors';

interface MeetingListProps {
  groupedMeetings: { [key: string]: Meeting[] };
  onMeetingPress: (meeting: Meeting) => void;
  onPlayPress: (meeting: Meeting) => void;
  onLongPress?: (meeting: Meeting) => void;
  onDeletePress?: (meeting: Meeting) => void;
}

export function MeetingList({
  groupedMeetings,
  onMeetingPress,
  onPlayPress,
  onLongPress,
  onDeletePress,
}: MeetingListProps) {
  const colors = useColors();

  // Converter grupos em lista flat para FlatList
  const flatData: Array<{ type: 'header' | 'item'; data: string | Meeting }> = [];

  const dateOrder = ['Hoje', 'Amanhã', 'Próximas'];

  dateOrder.forEach((date) => {
    if (groupedMeetings[date] && groupedMeetings[date].length > 0) {
      flatData.push({ type: 'header', data: date });
      groupedMeetings[date].forEach((meeting) => {
        flatData.push({ type: 'item', data: meeting });
      });
    }
  });

  if (flatData.length === 0) {
    return (
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.emptyText,
            {
              color: colors.muted,
            },
          ]}
        >
          Nenhuma reunião encontrada
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={flatData}
      keyExtractor={(item, index) => {
        if (item.type === 'header') {
          return `header-${item.data}`;
        }
        return (item.data as Meeting).id;
      }}
      renderItem={({ item }) => {
        if (item.type === 'header') {
          return <DateHeader date={item.data as string} />;
        }

        const meeting = item.data as Meeting;
        return (
          <Pressable
            style={styles.itemContainer}
            onLongPress={() => onLongPress?.(meeting)}
            disabled={!onLongPress}
          >
            <MeetingItem
              meeting={meeting}
              onPress={() => onMeetingPress(meeting)}
              onPlayPress={() => onPlayPress(meeting)}
              onDeletePress={onDeletePress ? () => onDeletePress(meeting) : undefined}
            />
          </Pressable>
        );
      }}
      contentContainerStyle={styles.listContent}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
