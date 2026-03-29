import { StyleSheet } from "react-native";

export interface ThemeColors {
  primary: string;
  text: string;

  background: string;
  cardBackground: string;
  buttonTextColor: string;
}

export const dialogColors = {
  success: "#006446",
  error: "#B00020",
  info: "#FFA000",
};

export const colors: ThemeColors = {
  primary: "#006446",
  text: "#6d6d6d",

  background: "#F2F2F2",
  cardBackground: "white",
  buttonTextColor: "white",
};

export const lightColors: ThemeColors = {
  primary: "#006446",
  text: "black",

  background: "#F2F2F2",
  cardBackground: "white",
  buttonTextColor: "white",
};

export const darkColors: ThemeColors = {
  primary: "#006446",
  text: "white",

  background: "#090909",
  cardBackground: "#2d2d2d",
  buttonTextColor: "white",
};

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    // color: colors.text,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // color: colors.text,
  },

  input: {
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    // color: colors.text,
    height: 40,
    margin: 12,
    padding: 10,
  },

  mainContainer: {
    flex: 1,
    // backgroundColor: colors.background,
  },
  globalMargin: {
    paddingHorizontal: 20,
    flex: 1,
  },

  btnPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  btnPrimaryText: {
    // color: colors.text,
    fontSize: 16,
  },
});
