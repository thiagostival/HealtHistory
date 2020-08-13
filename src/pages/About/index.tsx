import React, { useCallback } from 'react';
import { ScrollView, Linking } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  Title,
  ParagrafsView,
  Paragrafs,
  LinkButton,
  LinkButtonText,
} from './styles';

const About: React.FC = () => {
  const { goBack } = useNavigation();
  const linkArquitetura =
    'https://drive.google.com/drive/folders/1_8aXOpiHB0Wq38vrm_5xxrrl6KIaSLTR?usp=sharing';

  const linkGrupo = 'https://ww2.inf.ufg.br/~insight/';

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const openLink = useCallback(async (link) => {
    await Linking.openURL(link);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Sobre o Projeto</HeaderTitle>
      </Header>

      <ScrollView>
        <ParagrafsView>
          <Title>Resumo</Title>
          <Paragrafs>
            {'     '}O projeto é desenvolver uma arquitetura de sistema de
            registro médico com o uso de blockchain para armazenar esses dados.
          </Paragrafs>
          <Paragrafs>
            {'     '}A arquitetura visa armazenar dados de consultas médicas,
            vacinas, exames, procedimentos/cirurgias, dentre outros dados, que
            atualmente o paciente não tem controle sobre eles, pois estão
            espalhados em diversos hospitais, clínicas e etc.
          </Paragrafs>
          <Paragrafs>
            {'     '}A ferramenta utilizada para a rede blockchain é a
            Hyperledger, que cria uma rede blockchain privada e permissionada, o
            que significa que o acesso a rede é controlado, novos nós precisam
            ser aceitos pelo nó principal ou atender os requisitos do Smart
            Contract. Possuindo assim maior segurança e privacidade dos dados.
          </Paragrafs>
          <Paragrafs>
            {'     '}A finalidade desse aplicativo é validar a arquitetura com
            uma das funcionalidades, a de histórico de consultas médicas, para
            poder verificar a viabilidade da arquitetura.
          </Paragrafs>
          <Paragrafs>
            {'     '}Para verificar essa viabilidade, é utilizado nessa
            aplicação o tempo gasto na rede blockchain e o tempo total no
            servidor node. Assim é possível verificar se é viável uma aplicação
            desse porte.
          </Paragrafs>
          <Paragrafs>
            {'     '}A aplicação é estruturada da seguinte forma:
          </Paragrafs>
          <Paragrafs>
            {'          '}App {' -> '} Servidor Node {' -> '} Blockchain
          </Paragrafs>
          <Paragrafs>
            {'     '}A aplicação comunica com o servidor Node, como qualquer
            aplicação mobile, e o servidor Node comunica com a rede blockchain,
            através do Smart Contract, para realizar as operações desenvolvidas.
          </Paragrafs>
          <Paragrafs>
            {'     '}Os blocos da blockchain além de conter seus atributos
            básicos possui o CPF do paciente, onde esse é o ID único do bloco, e
            um array de consultas, onde cada posição do array é um objeto com os
            dados da consulta, nome e especialidade do médico, data da consulta
            e observações.
          </Paragrafs>
          <Paragrafs>
            {'     '}O paciente ao se cadastrar, é criado um bloco na rede
            blockchain para ele, e quando ele insere dados de consultas por
            exemplo, esses dados são armazenados no array, e o bloco é
            atualizado na rede blockchain.
          </Paragrafs>
          <Title>Projeto e Desenvolvedor</Title>
          <Paragrafs>
            {'     '}Esse projeto foi desenvolvido na Iniciação Científica, no
            Instituto de Informática da Universidade Federal de Góias.
          </Paragrafs>
          <Paragrafs>
            {'     '}Desenvolvido por Thiago Stival, participante do grupo de
            pesquisa GOIN-SIGHT, coordenado pelo professor Valdemar Neto
          </Paragrafs>
          <Paragrafs />
          <Paragrafs>Links:</Paragrafs>
          <LinkButton onPress={() => openLink(linkArquitetura)}>
            <LinkButtonText>
              Relatório do projeto: Disponível no Google Drive
            </LinkButtonText>
          </LinkButton>
          <LinkButton onPress={() => openLink(linkGrupo)}>
            <LinkButtonText>Site GOIN-SIGHT</LinkButtonText>
          </LinkButton>
        </ParagrafsView>
      </ScrollView>
    </Container>
  );
};

export default About;
