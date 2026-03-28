import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { CustomInput } from "../../components/ui/CustomInput";
import { PrimaryButton } from "../../components/ui/PrimaryButton";
import { colors } from "../../../config/theme/theme";
import { useLogin } from "../../hooks/useLogin";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const LoginScreen = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoading, login } = useLogin();

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined, general: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Correo inválido";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "Debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      if (form.email === '' || form.password === '') {
            return;
        }

        const result = await login(form.email, form.password);
        console.log(result);
        

        

      // Simulación de login (aquí iría tu servicio real)
    //   await new Promise(resolve => setTimeout(resolve, 1200));

    //   if (form.email !== "test@test.com" || form.password !== "123456") {
    //     throw new Error("Credenciales incorrectas");
    //   }

      console.log("Login exitoso");

    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        general: error.message || "Error inesperado"
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.inner}>

        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>ATJR</Text>

        <CustomInput
          label="Email"
          value={form.email}
          onTextChange={(value) => handleChange("email", value)}
          keyboardType="email-address"
          hasError={!!errors.email}
          outlineColor="#ccc"
          textColor="#000"
          style={styles.input}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <CustomInput
          label="Password"
          value={form.password}
          onTextChange={(value) => handleChange("password", value)}
          isSecure
          hasError={!!errors.password}
          outlineColor="#ccc"
          textColor="#000"
          style={styles.input}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {errors.general && (
          <Text style={styles.errorGeneral}>{errors.general}</Text>
        )}

        <PrimaryButton
          text={isSubmitting ? "Cargando..." : "INICIAR SESIÓN"}
          onPress={handleLogin}
          styles={styles.button}
        />

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 32,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 8,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 24,
    marginTop: 8,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
    height: 56,
    width: 280,
  },
  button: {
    marginTop: 20,
    borderRadius: 6,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    width: 280,
    alignSelf: 'center',
  },
  signUp: {
    color: colors.primary,
    fontWeight: "600"
  },
  errorText: {
    color: "#B00020",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
    alignSelf: 'flex-start',
  },
  errorGeneral: {
    color: "#B00020",
    textAlign: "center",
    marginBottom: 10
  }
});
