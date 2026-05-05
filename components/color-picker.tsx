import React from 'react';
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { MEETING_COLORS, COLOR_NAMES } from '@/lib/mock-data';
import { Ionicons } from '@expo/vector-icons';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  const colors = useColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      contentContainerStyle={styles.content}
    >
      {MEETING_COLORS.map((color) => (
        <Pressable
          key={color}
          onPress={() => onColorSelect(color)}
          style={({ pressed }) => [
            styles.colorOption,
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <View
            style={[
              styles.colorCircle,
              {
                backgroundColor: color,
                borderWidth: selectedColor === color ? 3 : 0,
                borderColor: colors.foreground,
              },
            ]}
          >
            {selectedColor === color && (
              <Ionicons name="checkmark" size={18} color="white" />
            )}
          </View>
          <Text
            style={[
              styles.colorLabel,
              {
                color: colors.foreground,
              },
            ]}
            numberOfLines={1}
          >
            {COLOR_NAMES[color]}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
  },
  colorOption: {
    alignItems: 'center',
    gap: 6,
  },
  colorCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 60,
  },
});
