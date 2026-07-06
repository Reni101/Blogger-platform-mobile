import { type ReactElement } from 'react';
import {
  type ListRenderItemInfo,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type ProfileWidgetRowItem = {
  id: 'theme' | 'logout' | 'change-password' | 'change-email';
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
