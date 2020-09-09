import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  TitleOptions,
  OptionsContainer,
  OptionsButton,
  OptionsButtonIcon,
  OptionsButtonText,
} from './styles';

import recordsImg from '../../assets/records.png';
import consultationImg from '../../assets/consultation.png';
import metricsImg from '../../assets/metrics.png';
import informationImg from '../../assets/information.png';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  const navigateToHistoryConsultations = useCallback(() => {
    navigate('HistoryConsultations');
  }, [navigate]);

  const navigateToAddConsultation = useCallback(() => {
    navigate('AddConsultation');
  }, [navigate]);

  const navigateToStatistics = useCallback(() => {
    navigate('Statistics');
  }, [navigate]);

  const navigateToAbout = useCallback(() => {
    navigate('About');
  }, [navigate]);

  const logout = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => logout()}>
          <Icon name="log-out" size={24} color="#cc0000" />
          <OptionsButtonText>Sair</OptionsButtonText>
        </ProfileButton>
      </Header>

      <ScrollView>
        <TitleOptions>Opções</TitleOptions>

        <OptionsContainer>
          <OptionsButton onPress={navigateToHistoryConsultations}>
            <OptionsButtonIcon source={recordsImg} />
            <OptionsButtonText>Histórico de Consultas</OptionsButtonText>
          </OptionsButton>

          <OptionsButton onPress={navigateToAddConsultation}>
            <OptionsButtonIcon source={consultationImg} />
            <OptionsButtonText>Adicionar Consulta</OptionsButtonText>
          </OptionsButton>

          <OptionsButton onPress={navigateToStatistics}>
            <OptionsButtonIcon source={metricsImg} />
            <OptionsButtonText>Estatísticas</OptionsButtonText>
          </OptionsButton>

          <OptionsButton onPress={navigateToAbout}>
            <OptionsButtonIcon source={informationImg} />
            <OptionsButtonText>Sobre o Projeto</OptionsButtonText>
          </OptionsButton>
        </OptionsContainer>
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
