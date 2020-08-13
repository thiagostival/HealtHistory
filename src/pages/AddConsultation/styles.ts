import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

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
  margin-right: 110px;
`;

export const ContainerForm = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Calendar = styled.View`
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f4ede8;
  margin: 0 24px 15px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
  background: #27ae60;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #f4ede8;
`;

export const ViewLoad = styled.View`
  background: rgba(0, 34, 66, 0.4);
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
