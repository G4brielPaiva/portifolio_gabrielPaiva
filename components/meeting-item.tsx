import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Meeting } from '@/lib/types';
import { formatMeetingTime } from '@/lib/use-filtered-meetings';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';

interface MeetingItemProps {
  meeting: Meeting;
  onPress: () => void;
  onPlayPress: () => void;
  onDeletePress?: () => void;
}

export function MeetingItem({ meeting, onPress, onPlayPress, onDeletePress }: MeetingItemProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surface,
          borderLeftColor: meeting.cor_hex,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: colors.foreground,
                textDecorationLine: meeting.concluida ? 'line-through' : 'none',
                opacity: meeting.concluida ? 0.6 : 1,
              },
            ]}
            numberOfLines={1}
          >
            {meeting.titulo}
          </Text>
          <Text
            style={[
              styles.time,
              {
                color: colors.muted,
              },
            ]}
          >
            {formatMeetingTime(meeting.data_hora)}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={onPlayPress}
            style={({ pressed }) => [
              styles.playButton,
              {
                backgroundColor: meeting.cor_hex,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Ionicons name="play" size={20} color="white" />
          </Pressable>

          {onDeletePress && (
            <Pressable
              onPress={onDeletePress}
              style={({ pressed }) => [
                styles.deleteButton,
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Ionicons name="close-circle" size={28} color={colors.error} />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    fontWeight: '400',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
