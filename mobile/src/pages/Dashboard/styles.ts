import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

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

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #27ae60;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const TitleOptions = styled.Text`
  text-align: center;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin-top: 24px;
  color: #f4ede8;
`;

export const OptionsContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin: 14px 0;
`;

export const OptionsButton = styled(RectButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 110px;
  background: #00396d;
  margin: 10px 30px;
  border-radius: 10px;
`;

export const OptionsButtonIcon = styled.Image`
  width: 60px;
  height: 60px;
`;

export const OptionsButtonText = styled.Text`
  text-align: center;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin-top: 10px;
`;
