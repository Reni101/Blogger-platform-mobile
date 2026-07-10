import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Header } from './Header.tsx';

export function StackHeader({
  options,
  navigation,
}: NativeStackHeaderProps) {
  return (
    <Header
      onBackPress={() => navigation.goBack()}
      title={options.title ?? ''}
    />
  );
}
