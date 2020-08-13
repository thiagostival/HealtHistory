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
  ObservationText,
  List,
  InfoCard,
  Info,
  InfoTitle,
  InfoTitleText,
  InfoData,
  InfoText,
  ViewLoad,
} from './styles';

export interface Metrics {
  id: string;
  transaction_name: string;
  transaction_time: string;
  time_total: string;
  observation: string;
}

const Statistics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [load, setLoad] = useState(true);
  const { goBack } = useNavigation();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('metrics').then((response) => {
      setMetrics(response.data);
      setLoad(false);
    });
  }, []);
  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Estatísticas de Tempo</HeaderTitle>
      </Header>

      {load ? (
        <ViewLoad>
          <ActivityIndicator size="large" color="#fff" />
        </ViewLoad>
      ) : null}

      <List
        data={metrics}
        keyExtractor={(itemMetrics) => itemMetrics.id}
        ListHeaderComponent={(
          <ObservationText>
            *Tempo, aproximado, gasto no Servidor
          </ObservationText>
        )}
        renderItem={({ item: itemMetrics, index }) => (
          <InfoCard
            style={index === metrics.length - 1 ? { marginBottom: 50 } : {}}
          >
            <Info>
              <InfoTitle>
                <InfoTitleText>Nome da Transação:</InfoTitleText>
                <InfoTitleText>Tempo Transação:</InfoTitleText>
                <InfoTitleText>*Tempo Total:</InfoTitleText>
                <InfoTitleText>Observações:</InfoTitleText>
              </InfoTitle>
              <InfoData>
                <InfoText>{itemMetrics.transaction_name}</InfoText>
                <InfoText>{itemMetrics.transaction_time}</InfoText>
                <InfoText>{itemMetrics.time_total}</InfoText>
                <InfoText>{itemMetrics.observation}</InfoText>
              </InfoData>
            </Info>
          </InfoCard>
        )}
      />
    </Container>
  );
};

export default Statistics;
