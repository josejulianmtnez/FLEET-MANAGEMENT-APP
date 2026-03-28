import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { globalStyles } from "../../../config/theme/theme";
import { useContext } from "react";

interface Props {
    text: string;
    styles?: StyleProp<ViewStyle>;
    

    onPress: () => void;
}

export const PrimaryButton = ({text, styles, onPress } : Props) => {

  return (
    <Pressable
      onPress={ onPress }
      style={ ({ pressed }) => ([
        globalStyles.btnPrimary,
        {
            opacity: pressed ? 0.8 : 1,
        },
        styles
      ]) }
    >
        <Text style={[
            globalStyles.btnPrimaryText,
            {
                color: '#fff'
            }
        ]}>{ text }</Text>
    </Pressable>
  )
}
