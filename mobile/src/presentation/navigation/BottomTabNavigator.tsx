import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/tabs/HomeScreen';
import { colors } from '../../config/theme/theme';
import { MyIcon } from '../components/ui/MyIcon';
import { ProfileScreen } from '../screens/tabs/ProfileScreen';
import { TransactionScreen } from '../screens/tabs/TransactionScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: colors.cardBackground,
        },
        tabBarInactiveTintColor: colors.text,
        headerShown: false,
      }}
      
    >
      <Tab.Screen 
        name="HomeScreen" 
        options={{ title: 'Inicio', tabBarIcon: ({ color }) => <MyIcon name="home" color={ color } /> }} 
        component={HomeScreen}  />
      <Tab.Screen 
        name="TransactionScreen" 
        options={{ title: 'Transacciones', tabBarIcon: ({ color }) => <MyIcon name="plus-square" color={ color } /> }} 
        component={TransactionScreen}  />
      <Tab.Screen 
        name="ProfileScreen" 
        options={{ title: 'Perfil', tabBarIcon: ({ color }) => <MyIcon name="person" color={ color } /> }} 
        component={ProfileScreen}  />

    </Tab.Navigator>
  );
}
