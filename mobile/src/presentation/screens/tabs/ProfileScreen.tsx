import { Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { Button, Layout } from "@ui-kitten/components";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { colors } from "../../../config/theme/theme";

export const ProfileScreen = () => {

  const { logout } = useAuthStore();

  return (
    <MainLayout
      title="Perfil"
    >
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={logout} style={{ marginBottom: 10, backgroundColor: colors.primary, borderColor: colors.primary }} >
          Cerrar Sesión
        </Button>
      </Layout>
    </MainLayout>
  )
}
