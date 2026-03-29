import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { PaperProvider } from 'react-native-paper';

export const AtjrApp = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];

  const navigationTheme =
    colorScheme === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: "#3366FF",
            background: backgroundColor,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: "#3366FF",
            background: backgroundColor,
          },
        };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <PaperProvider>
        <ApplicationProvider {...eva} theme={theme}>
          <NavigationContainer theme={navigationTheme}>
            <AuthProvider>
              <StackNavigator />
            </AuthProvider>
          </NavigationContainer>
        </ApplicationProvider>
      </PaperProvider>
    </>
  );
};
