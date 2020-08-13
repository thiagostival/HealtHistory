import React, { useCallback, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  ContainerForm,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  ViewLoad,
} from './styles';

interface SignUpFormData {
  medico: string;
  especialidade: string;
  observation: string;
}

interface DataPost {
  medico: string;
  especialidade: string;
  data: Date;
  observation: string;
}

const AddConsultation: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const especialidadeInputRef = useRef<TextInput>(null);
  const observationInputRef = useRef<TextInput>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [contDatePicker, setContDatePicker] = useState(0);
  const [contTimePicker, setContTimePicker] = useState(0);
  const [load, setLoad] = useState(false);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleAddConsultation = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          medico: Yup.string().required('Medico obrigatório'),
          especialidade: Yup.string().required('Especialidade obrigatório'),
          observation: Yup.string().optional(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (contDatePicker === 0 || contTimePicker === 0) {
          Alert.alert(
            'Selecione uma data e horário',
            'Data e Hora da consulta são obrigatórios!',
          );
          return;
        }

        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes(),
        );

        const dataPost: DataPost = {
          medico: data.medico,
          especialidade: data.especialidade,
          data: date,
          observation: data.observation ? data.observation : ' ',
        };

        setLoad(true);
        await api.post('/consultations', dataPost).then(() => {
          setLoad(false);
        });

        Alert.alert(
          'Consulta adicionada com sucesso!',
          'Consulta adicionada ao seu histórico.',
        );

        navigate('Dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao adicionar',
          'Ocorreu um erro ao adicionar a Consulta, tente novamente!',
        );
      }
    },
    [selectedDate, selectedTime, contDatePicker, contTimePicker, navigate],
  );

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
    setContDatePicker(1);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleToggleTimePicker = useCallback(() => {
    setShowTimePicker((state) => !state);
    setContTimePicker(1);
  }, []);

  const handleTimeChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowTimePicker(false);
      }

      if (date) {
        setSelectedTime(date);
      }
    },
    [],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Adicionar Consulta</HeaderTitle>
      </Header>

      {load ? (
        <ViewLoad>
          <ActivityIndicator size="large" color="#fff" />
        </ViewLoad>
      ) : null}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <ContainerForm>
            <Calendar>
              <Title>Data da Consulta</Title>

              <OpenDatePickerButton onPress={handleToggleDatePicker}>
                {contDatePicker !== 0 ? (
                  <OpenDatePickerButtonText>
                    {`${selectedDate.getDate()} - ${
                      selectedDate.getMonth() + 1
                    } - ${selectedDate.getFullYear()}`}
                  </OpenDatePickerButtonText>
                ) : (
                  <OpenDatePickerButtonText>
                    Selecionar Data
                  </OpenDatePickerButtonText>
                )}
              </OpenDatePickerButton>

              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  onChange={handleDateChanged}
                  textColor="#f4ede8"
                  value={selectedDate}
                />
              )}
            </Calendar>
            <Calendar>
              <Title>Hora da Consulta</Title>

              <OpenDatePickerButton onPress={handleToggleTimePicker}>
                {contTimePicker !== 0 ? (
                  <OpenDatePickerButtonText>
                    {selectedTime.getMinutes() < 10
                      ? `${selectedTime.getHours()}:0${selectedTime.getMinutes()}h`
                      : `${selectedTime.getHours()}:${selectedTime.getMinutes()}h`}
                  </OpenDatePickerButtonText>
                ) : (
                  <OpenDatePickerButtonText>
                    Selecionar Hora
                  </OpenDatePickerButtonText>
                )}
              </OpenDatePickerButton>

              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  is24Hour
                  onChange={handleTimeChanged}
                  textColor="#f4ede8"
                  value={selectedTime}
                />
              )}
            </Calendar>

            <Form ref={formRef} onSubmit={handleAddConsultation}>
              <Input
                autoCapitalize="words"
                name="medico"
                icon="user"
                placeholder="Medico"
                returnKeyType="next"
                onSubmitEditing={() => {
                  especialidadeInputRef.current?.focus();
                }}
              />
              <Input
                ref={especialidadeInputRef}
                autoCapitalize="words"
                name="especialidade"
                icon="book"
                placeholder="Especialidade"
                returnKeyType="next"
                onSubmitEditing={() => {
                  observationInputRef.current?.focus();
                }}
              />
              <Input
                ref={observationInputRef}
                autoCapitalize="sentences"
                name="observation"
                icon="edit"
                placeholder="Observações"
              />

              <Button
                onPress={() => formRef.current?.submitForm()}
                style={{ marginTop: 20 }}
              >
                Adicionar
              </Button>
            </Form>
          </ContainerForm>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AddConsultation;
