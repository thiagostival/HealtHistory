import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  List,
  ConsultationInfo,
  Medico,
  MedicoText,
  Divisor,
  Especialidade,
  Observation,
  ObservationText,
  Data,
  DataText,
  ViewLoad,
} from './styles';

export interface History {
  data: string;
  especialidade: string;
  medico: string;
  observation: string;
}

const HistoryConsultations: React.FC = () => {
  const [history, setHistory] = useState<History[]>([]);
  const [load, setLoad] = useState(true);
  const { goBack } = useNavigation();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('/consultations').then((response) => {
      setHistory(response.data);
      setLoad(false);
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Histórico de Consultas</HeaderTitle>
      </Header>

      {load ? (
        <ViewLoad>
          <ActivityIndicator size="large" color="#fff" />
        </ViewLoad>
      ) : null}

      <List
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: itemHistory, index }) => (
          <ConsultationInfo
            style={index === history.length - 1 ? { marginBottom: 50 } : {}}
          >
            <Medico>
              <MedicoText>{itemHistory.medico}</MedicoText>
              <Divisor> | </Divisor>
              <Especialidade>{itemHistory.especialidade}</Especialidade>
            </Medico>
            <Observation>
              <ObservationText style={{ marginBottom: 5, color: '#27AE60' }}>
                Observações:
              </ObservationText>
              <ObservationText>
                {itemHistory.observation === ' '
                  ? 'Sem Observações'
                  : itemHistory.observation}
              </ObservationText>
            </Observation>

            <Data>
              <Icon name="calendar" size={14} color="#27AE60" />
              <DataText>{itemHistory.data}</DataText>
            </Data>
          </ConsultationInfo>
        )}
      />
    </Container>
  );
};

export default HistoryConsultations;
