import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface DateHeaderProps {
  date: string; // "Hoje", "Amanhã", "Próximas", etc.
}

export function DateHeader({ date }: DateHeaderProps) {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text
        style={[
          styles.text,
          {
            color: colors.muted,
          },
        ]}
      >
        {date}
      </Text>
      <View
        style={[
          styles.divider,
          {
            backgroundColor: colors.border,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    width: '100%',
  },
});
