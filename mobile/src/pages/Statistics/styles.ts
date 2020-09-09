import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { Metrics } from './index';

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

export const List = styled(FlatList as new () => FlatList<Metrics>)`
  padding: 20px 10px 20px;
`;

export const ObservationText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 15px;
  color: #fff;
  margin-bottom: 10px;
`;

export const InfoCard = styled.View`
  background: #00396d;
  padding-bottom: 20px;
  margin: 10px 0;
  border-radius: 10px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 5px;
`;

export const InfoTitle = styled.View`
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5px;
`;

export const InfoTitleText = styled.Text`
  text-align: center;
  font-family: 'RobotoSlab-Regular';
  font-size: 15px;
  color: #27ae60;
  margin-top: 5px;
`;

export const InfoData = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const InfoText = styled.Text`
  text-align: center;
  font-family: 'RobotoSlab-Regular';
  font-size: 15px;
  color: #f4ede8;
  margin-top: 5px;
`;

export const ViewLoad = styled.View`
  background: rgba(0, 34, 66, 0.4);
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
