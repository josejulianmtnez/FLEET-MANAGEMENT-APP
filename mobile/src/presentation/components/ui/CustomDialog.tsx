// import { Portal, Dialog, Text, Button } from 'react-native-paper';
// import { View } from 'react-native';
// import FontAwesome6 from '@react-native-vector-icons/FontAwesome6';
// import { dialogColors } from '../../../config/theme/theme';

// interface Props {
//     title?: string;
//     body?: string;
//     b1?: { title: string; action: () => void; textColor?: any };
//     hide: () => void;
//     vis: boolean;
//     type?: 'success' | 'error' | 'warning';
// }

// export const DialogCustom = ({ title, body, b1, hide, vis, type = 'success' }: Props) => {
//     const colorMap = {
//         success: dialogColors.success,
//         error: dialogColors.error,
//         warning: dialogColors.info,
//     };
//     const iconMap = {
//         success: 'circle-check',
//         error: 'circle-xmark',
//         warning: 'triangle-exclamation',
//     };
//     const color = colorMap[type] || colorMap.success;
//     const icon = iconMap[type] || iconMap.success;

//     return (
//         <Portal>
//             <Dialog visible={vis} onDismiss={hide} style={{ backgroundColor: '#FFF' }}>
//                 <View style={{ alignItems: 'center', marginBottom: 10 }}>
//                     <FontAwesome6
//                         name={icon}
//                         size={80}
//                         color={color}
//                         solid
//                     />
//                 </View>
//                 {title && (
//                     <Dialog.Title style={{ color, textAlign: 'center' }}>{title}</Dialog.Title>
//                 )}
//                 {body && (
//                     <Dialog.Content>
//                         <Text style={{ color, textAlign: 'center' }} variant='bodyMedium'>{body}</Text>
//                     </Dialog.Content>
//                 )}
//                 <Dialog.Actions style={{ flexDirection: 'column', alignItems: 'center' }}>
//                     {b1 && (
//                         <Button style={{ width: '100%' }} labelStyle={[{ fontSize: 16, color }, b1.textColor]} onPress={b1.action}>{b1.title}</Button>
//                     )}
//                 </Dialog.Actions>
//             </Dialog>
//         </Portal>
//     );
// };
