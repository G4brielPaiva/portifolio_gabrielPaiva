import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { MEETING_COLORS } from '@/lib/mock-data';
import { Ionicons } from '@expo/vector-icons';

interface ColorFilterProps {
  selectedColor: string | null;
  onColorSelect: (color: string | null) => void;
}

export function ColorFilter({ selectedColor, onColorSelect }: ColorFilterProps) {
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
      {/* Botão "Todas as cores" */}
      <Pressable
        onPress={() => onColorSelect(null)}
        style={({ pressed }) => [
          styles.colorButton,
          {
            backgroundColor: selectedColor === null ? colors.primary : colors.surface,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Ionicons
          name="checkmark"
          size={20}
          color={selectedColor === null ? 'white' : colors.muted}
        />
      </Pressable>

      {/* Botões de cores */}
      {MEETING_COLORS.map((color) => (
        <Pressable
          key={color}
          onPress={() => onColorSelect(color)}
          style={({ pressed }) => [
            styles.colorButton,
            {
              backgroundColor: color,
              opacity: pressed ? 0.8 : 1,
              borderWidth: selectedColor === color ? 3 : 0,
              borderColor: colors.foreground,
            },
          ]}
        >
          {selectedColor === color && (
            <Ionicons name="checkmark" size={20} color="white" />
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
