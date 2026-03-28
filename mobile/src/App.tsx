// import { NavigationContainer } from "@react-navigation/native"
// import { Navigation } from "./presentation/navigation/Navigation"

import { LoginScreen } from "./presentation/screens/login/LoginScreen"
import { PaperProvider } from 'react-native-paper';

export const App = () => {
  return (
      // <NavigationContainer>
      //   <Navigation />
      // </NavigationContainer>
      <PaperProvider>
        <LoginScreen />
      </PaperProvider>
  )
}
