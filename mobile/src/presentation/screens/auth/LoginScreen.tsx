import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { Alert, Image, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyIcon } from "../../components/ui/MyIcon";
import { colors } from "../../../config/theme/theme";
import { RootStackParams } from "../../navigation/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = () => {

  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const { height } = useWindowDimensions();

  const onLogin = async () => {
    setIsPosting(true);
    if(form.email.length === 0 || form.password.length === 0) return;

    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccessful) {return};

    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>

        <Layout style={{ paddingTop: height * 0.20, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={{ width: '100%', height: 300 }}
            resizeMode="contain"
          />
          <Text category="h1">
            Bienvenido
          </Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            accessoryLeft={ <MyIcon name="email-outline" /> }
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={ (email) => setForm({...form, email}) }
            style={{ marginBottom: 10 }}
          />
          <Input
            accessoryLeft={ <MyIcon name="lock-outline" /> }
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={ (password) => setForm({...form, password}) }
            secureTextEntry
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ marginTop: 20 }} />

        <Layout>
          <Button
            disabled={isPosting}
            style={{ backgroundColor: colors.primary, borderColor: colors.primary }}
            accessoryRight={ <MyIcon name="log-in-outline" white /> }
            onPress={onLogin}
          >
            Ingresar
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  )
}
