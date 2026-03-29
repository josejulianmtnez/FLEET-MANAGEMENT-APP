import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Layout,
  Text,
  Input,
  Button,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import { colors } from "../../../config/theme/theme";
import { addTransaction } from "../../../actions/transaction/transaction";

export const TransactionScreen = () => {

  const [type, setType] = useState<"DEBIT" | "CREDIT">("DEBIT");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedTruckIndex, setSelectedTruckIndex] = useState<IndexPath | null>(null);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<IndexPath | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 MOCK (luego conectar API)
  const trucks = [1, 2, 3];
  const paymentSources = [1, 2];

  const onSubmit = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert("Ingresa un monto válido");
      return;
    }
    if (type === "DEBIT" && selectedTruckIndex === null) {
      Alert.alert("Selecciona un camión");
      return;
    }
    if (type === "CREDIT" && selectedPaymentIndex === null) {
      Alert.alert("Selecciona una fuente de pago");
      return;
    }
    setLoading(true);
    // Construir el payload con los nombres y tipos que espera addTransaction
    const payload = {
      effectiveDate: new Date(),
      type,
      amount: Number(amount),
      truckId: type === "DEBIT" ? selectedTruckIndex!.row + 1 : undefined,
      paymentSourceId: type === "CREDIT" ? selectedPaymentIndex!.row + 1 : undefined,
      reference: reference || undefined,
      notes: notes || undefined,
    };
    try {
      // Transformar a snake_case antes de enviar a la API
      const apiPayload = {
        effective_date: payload.effectiveDate.toISOString(),
        type: payload.type,
        amount: payload.amount.toFixed(2),
        truck_id: payload.truckId ?? null,
        payment_source_id: payload.paymentSourceId ?? null,
        reference: payload.reference ?? null,
        notes: payload.notes ?? null,
      };
      const res = await addTransaction(apiPayload);
      if (res) {
        Alert.alert("Transacción registrada exitosamente");
        setAmount("");
        setReference("");
        setNotes("");
        setSelectedTruckIndex(null);
        setSelectedPaymentIndex(null);
      } else {
        Alert.alert("Error al registrar la transacción");
      }
    } catch (e) {
      Alert.alert("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="Nueva Transacción">
      <Layout style={styles.container}>

        <Text category="h6" style={styles.title}>
          Registrar Movimiento
        </Text>

        {/* 🔄 Tipo */}
        <View style={styles.typeContainer}>
          <Button
            style={[
              styles.typeButton,
              type === "DEBIT" && styles.activeDebit,
            ]}
            appearance={type === "DEBIT" ? "filled" : "outline"}
            onPress={() => setType("DEBIT")}
          >
            Consumo
          </Button>

          <Button
            style={[
              styles.typeButton,
              type === "CREDIT" && styles.activeCredit,
            ]}
            appearance={type === "CREDIT" ? "filled" : "outline"}
            onPress={() => setType("CREDIT")}
          >
            Pago
          </Button>
        </View>

        {/* 💰 Monto */}
        <Input
          label="Monto"
          placeholder="$0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />

        {/* 🚛 Selección de camión */}
        {type === "DEBIT" && (
          <Select
            label="Camión"
            placeholder="Selecciona un camión"
            value={
              selectedTruckIndex
                ? trucks[selectedTruckIndex.row]
                : ""
            }
            selectedIndex={selectedTruckIndex}
            onSelect={(index) => setSelectedTruckIndex(index as IndexPath)}
            style={styles.input}
          >
            {trucks.map((item, index) => (
              <SelectItem key={index} title={item} />
            ))}
          </Select>
        )}

        {/* 💳 Fuente de pago */}
        {type === "CREDIT" && (
          <Select
            label="Fuente de pago"
            placeholder="Selecciona fuente"
            value={
              selectedPaymentIndex
                ? paymentSources[selectedPaymentIndex.row]
                : ""
            }
            selectedIndex={selectedPaymentIndex}
            onSelect={(index) => setSelectedPaymentIndex(index as IndexPath)}
            style={styles.input}
          >
            {paymentSources.map((item, index) => (
              <SelectItem key={index} title={item} />
            ))}
          </Select>
        )}

        {/* 🔢 Referencia */}
        <Input
          label="Referencia"
          placeholder="Ej: 79012"
          value={reference}
          onChangeText={setReference}
          style={styles.input}
        />

        {/* 📝 Notas */}
        <Input
          label="Notas"
          placeholder="Opcional"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={styles.input}
        />

        {/* 🚀 Botón */}
        <Button
          style={styles.submitButton}
          onPress={onSubmit}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Movimiento"}
        </Button>

      </Layout>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  title: {
    marginBottom: 20,
    fontWeight: "bold",
  },

  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  typeButton: {
    width: "48%",
    borderRadius: 12,
  },

  activeDebit: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },

  activeCredit: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  input: {
    marginBottom: 15,
  },

  submitButton: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});