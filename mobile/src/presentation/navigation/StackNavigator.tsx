import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { BottomTabNavigator } from './BottomTabNavigator';

export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    BottomTabNavigator: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const StackNavigator = () => {
  return (
    <Stack.Navigator 
     initialRouteName='LoadingScreen'
     screenOptions={{
       headerShown: false,
     }}>
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="BottomTabNavigator" component={ BottomTabNavigator } />
    </Stack.Navigator>
  );
}
