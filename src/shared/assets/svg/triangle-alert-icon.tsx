import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const TriangleAlertIcon = memo((props: PropsType) => {
  const { color = '#000000', size = 24, strokeWidth = 2 } = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path
        stroke={color}
        strokeWidth={strokeWidth}
        d="M21.73 18l-8-14a2 2 0 00-3.48 0l-8 14A2 2 0 004 21h16a2 2 0 001.73-3M12 9v4M12 17h.01"
      />
    </Svg>
  );
});
