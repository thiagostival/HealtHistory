import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { History } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight(true) + 24}px;
  background: #003566;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-right: 80px;
`;

export const List = styled(FlatList as new () => FlatList<History>)`
  padding: 20px 5px 16px;
`;

export const ConsultationInfo = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  background: #00396d;
  margin: 10px 20px;
  border-radius: 10px;
  padding-bottom: 20px;
`;

export const Medico = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const MedicoText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const Divisor = styled.Text`
  color: #fff;
  margin: 0 5px;
`;

export const Especialidade = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 15px;
  color: #a0a0b2;
`;

export const Observation = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
`;

export const ObservationText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 15px;
  color: #f4ede8;
`;

export const Data = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

export const DataText = styled.Text`
  margin-left: 8px;
  color: #f2f2f2;
  font-family: 'RobotoSlab-Regular';
`;

export const ViewLoad = styled.View`
  background: rgba(0, 34, 66, 0.4);
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
