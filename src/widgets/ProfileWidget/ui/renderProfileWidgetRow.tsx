import { memo, type ReactElement } from 'react';
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
    | 'devices'
    | 'change-email'
    | 'change-avatar'
    | 'email-conformation';

  actionElement: ReactElement;
};

type RowStyles = {
  row: StyleProp<ViewStyle>;
};

type ProfileWidgetRowProps = {
  item: ProfileWidgetRowItem;
  rowStyle: StyleProp<ViewStyle>;
};

const ProfileWidgetRow = memo(({ item, rowStyle }: ProfileWidgetRowProps) => {
  return <View style={rowStyle}>{item.actionElement}</View>;
});

export const renderProfileWidgetRow =
  (styles: RowStyles) =>
  ({ item }: ListRenderItemInfo<ProfileWidgetRowItem>) => {
    return <ProfileWidgetRow item={item} rowStyle={styles.row} />;
  };
