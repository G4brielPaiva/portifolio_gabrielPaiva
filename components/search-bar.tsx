import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar reunião...',
}: SearchBarProps) {
  const colors = useColors();
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: isFocused ? colors.primary : colors.border,
        },
      ]}
    >
      <Ionicons
        name="search"
        size={20}
        color={colors.muted}
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: colors.foreground,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          style={({ pressed }) => [
            styles.clearButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Ionicons name="close-circle" size={20} color={colors.muted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 44,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
  },
});
