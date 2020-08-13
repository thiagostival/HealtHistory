import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import HistoryConsultations from '../pages/HistoryConsultations';
import AddConsultation from '../pages/AddConsultation';
import Statistics from '../pages/Statistics';
import About from '../pages/About';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#005AAC' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="HistoryConsultations" component={HistoryConsultations} />
    <App.Screen name="AddConsultation" component={AddConsultation} />
    <App.Screen name="Statistics" component={Statistics} />
    <App.Screen name="About" component={About} />
  </App.Navigator>
);

export default AppRoutes;
