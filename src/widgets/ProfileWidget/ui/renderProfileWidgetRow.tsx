import { type ReactElement } from 'react';
import { type ListRenderItemInfo, View } from 'react-native';
import { styles } from './ProfileWidget.styles';

export type ProfileWidgetRowItem = {
  id: 'theme' | 'logout' | 'change-password' | 'change-email';
  actionElement: ReactElement;
};

export const renderProfileWidgetRow = ({
  item,
}: ListRenderItemInfo<ProfileWidgetRowItem>) => {
  return <View style={styles.row}>{item.actionElement}</View>;
};
