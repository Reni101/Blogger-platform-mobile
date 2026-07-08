import { type ReactElement } from 'react';
import {
  type ListRenderItemInfo,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

export type ProfileWidgetRowItem = {
  id:
    | 'theme'
    | 'logout'
    | 'change-password'
    | 'change-email'
    | 'email-conformation';
  actionElement: ReactElement;
};

type RowStyles = {
  row: StyleProp<ViewStyle>;
};

export const renderProfileWidgetRow =
  (styles: RowStyles) =>
  ({ item }: ListRenderItemInfo<ProfileWidgetRowItem>) => {
    return <View style={styles.row}>{item.actionElement}</View>;
  };
