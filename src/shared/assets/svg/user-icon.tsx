import { memo } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};
export const UserIcon = memo((props: PropsType) => {
  const { color = '#000000', size = 24, strokeWidth = 2 } = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path
        d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"
        color={color}
        strokeWidth={strokeWidth}
      />
      <Circle cx={12} cy={7} r={4} />
    </Svg>
  );
});
