import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
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
  margin-right: 150px;
`;

export const UserName = styled.Text`
  color: #27ae60;
  font-family: 'RobotoSlab-Medium';
`;

export const Title = styled.Text`
  text-align: center;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin-top: 24px;
  color: #f4ede8;
`;

export const ParagrafsView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px 50px;
`;

export const Paragrafs = styled.Text`
  text-align: left;
  font-family: 'RobotoSlab-Regular';
  font-size: 15px;
  color: #f4ede8;
  margin-top: 10px;
`;

export const LinkButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  background: rgba(0, 53, 102, 0.5);
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
`;

export const LinkButtonText = styled.Text`
  text-align: left;
  font-family: 'RobotoSlab-Regular';
  font-size: 15px;
  color: #f4ede8;
`;
