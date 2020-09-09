import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #005aac;
  border-top-width: 1px;
  border-color: #e5e5e5;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: #f4ede8;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

export const InformationButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const InformationButtonText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
