import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { ColorPicker } from '@/components/color-picker';
import { useColors } from '@/hooks/use-colors';
import { useMeetings } from '@/lib/meeting-context';
import { Meeting } from '@/lib/types';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { generateMeetingSlug, getDefaultColor, COLOR_NAMES } from '@/lib/mock-data';

/**
 * Gerar ID único para reunião
 */
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export default function CreateMeetingScreen() {
  const router = useRouter();
  const colors = useColors();
  const { addMeeting, updateMeeting, getMeetingById } = useMeetings();
  const params = useLocalSearchParams();
  const meetingId = params.id as string | undefined;

  // Carregar reunião existente se estiver editando
  const existingMeeting = meetingId ? getMeetingById(meetingId) : null;

  const [titulo, setTitulo] = useState(existingMeeting?.titulo || '');
  const [data, setData] = useState(
    existingMeeting ? new Date(existingMeeting.data_hora) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    existingMeeting?.cor_hex || getDefaultColor()
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDateChange = useCallback((event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setData(selectedDate);
    }
  }, []);

  const handleTimeChange = useCallback((event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      const newDate = new Date(data);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setData(newDate);
    }
  }, [data]);

  const handleSave = useCallback(() => {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título para a reunião');
      return;
    }

    const slug = generateMeetingSlug(titulo);

    if (existingMeeting) {
      // Editar reunião existente
      updateMeeting(existingMeeting.id, {
        titulo: titulo.trim(),
        data_hora: data.toISOString(),
        slug_jitsi: slug,
        cor_hex: selectedColor,
      });
      setShowSuccessMessage(true);
      setTimeout(() => {
        router.back();
      }, 1500);
    } else {
      // Criar nova reunião
      const newMeeting: Meeting = {
        id: generateId(),
        titulo: titulo.trim(),
        data_hora: data.toISOString(),
        slug_jitsi: slug,
        cor_hex: selectedColor,
        concluida: false,
      };

      addMeeting(newMeeting);
      setShowSuccessMessage(true);
      setTimeout(() => {
        router.back();
      }, 1500);
    }
  }, [titulo, data, selectedColor, existingMeeting, addMeeting, updateMeeting, router]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = useCallback(() => {
    if (!existingMeeting) return;

    Alert.alert(
      'Deletar Reunião',
      `Tem certeza que deseja deletar "${existingMeeting.titulo}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            const { deleteMeeting } = useMeetings();
            deleteMeeting(existingMeeting.id);
            Alert.alert('Sucesso', 'Reunião deletada com sucesso!', [
              {
                text: 'OK',
                onPress: () => router.back(),
              },
            ]);
          },
        },
      ]
    );
  }, [existingMeeting, router]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
    >
      <ScreenContainer
        className="flex-1"
        containerClassName="bg-background"
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons name="chevron-back" size={28} color={colors.foreground} />
          </Pressable>
          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.foreground,
              },
            ]}
          >
            {existingMeeting ? 'Editar Reunião' : 'Nova Reunião'}
          </Text>
          {existingMeeting && (
            <Pressable
              onPress={handleDelete}
              style={({ pressed }) => [
                styles.deleteButton,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Ionicons name="trash" size={24} color={colors.error} />
            </Pressable>
          )}
        </View>

        {/* Success Message */}
        {showSuccessMessage && (
          <View
            style={[
              styles.successMessage,
              {
                backgroundColor: colors.success,
              },
            ]}
          >
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text style={styles.successMessageText}>
              {existingMeeting ? 'Reunião atualizada!' : 'Reunião criada!'}
            </Text>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Título */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.foreground,
                },
              ]}
            >
              Título da Reunião
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
              placeholder="Ex: Reunião de Planejamento"
              placeholderTextColor={colors.muted}
              value={titulo}
              onChangeText={setTitulo}
              returnKeyType="next"
            />
          </View>

          {/* Data */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.foreground,
                },
              ]}
            >
              Data
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={[
                styles.dateTimeButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <Text
                style={[
                  styles.dateTimeText,
                  {
                    color: colors.foreground,
                  },
                ]}
              >
                {formatDate(data)}
              </Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={data}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}

            {Platform.OS === 'ios' && showDatePicker && (
              <Pressable
                onPress={() => setShowDatePicker(false)}
                style={[
                  styles.datePickerDoneButton,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              >
                <Text style={styles.datePickerDoneButtonText}>Confirmar</Text>
              </Pressable>
            )}
          </View>

          {/* Hora */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.foreground,
                },
              ]}
            >
              Hora
            </Text>
            <Pressable
              onPress={() => setShowTimePicker(true)}
              style={[
                styles.dateTimeButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="time" size={20} color={colors.primary} />
              <Text
                style={[
                  styles.dateTimeText,
                  {
                    color: colors.foreground,
                  },
                ]}
              >
                {formatTime(data)}
              </Text>
            </Pressable>

            {showTimePicker && (
              <DateTimePicker
                value={data}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
              />
            )}

            {Platform.OS === 'ios' && showTimePicker && (
              <Pressable
                onPress={() => setShowTimePicker(false)}
                style={[
                  styles.datePickerDoneButton,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}
              >
                <Text style={styles.datePickerDoneButtonText}>Confirmar</Text>
              </Pressable>
            )}
          </View>

          {/* Cor */}
          <View style={styles.section}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.foreground,
                },
              ]}
            >
              Categoria (Cor)
            </Text>
            <View
              style={[
                styles.selectedColorDisplay,
                {
                  backgroundColor: selectedColor,
                },
              ]}
            >
              <Text style={styles.selectedColorName}>
                {COLOR_NAMES[selectedColor]}
              </Text>
            </View>
            <ColorPicker
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
          </View>

          {/* Botões de ação */}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.cancelButton,
                {
                  backgroundColor: colors.surface,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  {
                    color: colors.foreground,
                  },
                ]}
              >
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.saveButton,
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={styles.saveButtonText}>
                {existingMeeting ? 'Atualizar' : 'Criar'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
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
  backButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 44,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  successMessageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '400',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  datePickerDoneButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerDoneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedColorDisplay: {
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedColorName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});


