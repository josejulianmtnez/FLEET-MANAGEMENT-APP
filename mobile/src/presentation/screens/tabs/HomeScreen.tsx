import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Image, Platform, StyleSheet, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MainLayout } from "../../layouts/MainLayout";
import { colors } from '../../../config/theme/theme';
import { balance as getBalance } from '../../../actions/balance/balance';
import { useFocusEffect } from '@react-navigation/native';
import { FAB } from "react-native-paper";
import { MyIcon } from "../../components/ui/MyIcon";

export const HomeScreen = () => {
  const [state, setState] = useState({ open: false });

  const { user } = useAuthStore();
  const [balanceData, setBalanceData] = useState<{
    total_credits: number;
    total_debits: number;
    transaction_count: number;
    balance: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const movements: any[] = [];

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchBalance = async () => {
        setLoading(true);
        const data = await getBalance();
        if (isActive) setBalanceData(data);
        setLoading(false);
      };
      fetchBalance();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <MainLayout title="Inicio">
      <Layout style={styles.container}>

        <Text category="h6" style={styles.greeting}>
          Hola, Lic. {user?.name}
        </Text>

        <Layout style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Disponible</Text>
          <Text style={styles.balanceAmount}>
            {loading || !balanceData ? "$-" : `$${balanceData.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          </Text>
        </Layout>

        <View style={styles.cardsContainer}>

          <StatCard
            image={require("../../../assets/images/wallet.png")}
            label="Total Pagos"
            value={loading || !balanceData ? "$-" : `$${balanceData.total_credits.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            color={colors.primary}
          />

          <StatCard
            image={require("../../../assets/images/fuell.png")}
            label="Total Cargas"
            value={loading || !balanceData ? "$-" : `$${balanceData.total_debits.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            color="#E53935"
          />

          <StatCard
            image={require("../../../assets/images/clipboard.png")}
            label="Movimientos"
            value={loading || !balanceData ? "-" : `${balanceData.transaction_count}`}
            color="#222"
          />

        </View>


        <Text category="h6" style={styles.sectionTitle}>
          Últimos movimientos
        </Text>

        <Divider style={{ marginBottom: 10, backgroundColor: '#e2e2e2' }} />

        <FlatList
          data={movements}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MovementItem item={item} />
          )}
          ListEmptyComponent={
            <Text appearance="hint">No hay movimientos recientes.</Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />


      </Layout>

      <FAB.Group
        open={open}
        visible
        icon={ open ? 'close' : 'plus' }
        actions={[
          { icon: 'truck', 
            onPress: () => console.log('Pressed load'),
            label: 'Carga',
            color: 'white',
            style: { backgroundColor: colors.red,  }
          },
          { icon: 'credit-card', 
            onPress: () => console.log('Pressed add'),
            label: 'Pago',
            color: 'white',
            style: { backgroundColor: colors.success }
          },
        ]}
        onStateChange={onStateChange}
        fabStyle={{ backgroundColor: colors.primary }}
        color="white"
        backdropColor="transparent"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: Platform.OS === 'android' ? 100 : 0,
          backgroundColor: 'transparent',
        }}
      />

    </MainLayout>
  );
};


const StatCard = ({ image, label, value, color }: any) => {
  return (
    <Layout style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <Text style={[styles.cardLabel, { fontWeight: "bold" }]}>{label}</Text>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
    </Layout>
  );
};


const MovementItem = ({ item }: any) => {
  return (
    <Layout style={styles.movementItem}>
      <Text style={styles.movementTitle}>
        {item?.reference || "Movimiento"}
      </Text>
      <Text appearance="hint" category="p2">
        {item?.date || "Fecha"}
      </Text>
    </Layout>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  greeting: {
    marginBottom: 15,
    fontWeight: "bold",
  },

  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  balanceLabel: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },

  balanceAmount: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    width: "30%",
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    alignItems: "center",
    padding: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },

  cardLabel: {
    fontSize: 12,
    color: "gray",
    fontWeight: "600",
    textAlign: "center",
  },

  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },

  sectionTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },

  movementItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  movementTitle: {
    fontWeight: "600",
  },
});