import { memo } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const CameraIcon = memo((props: PropsType) => {
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
        d="M13.997 4a2 2 0 011.76 1.05l.486.9A2 2 0 0018.003 7H20a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h1.997a2 2 0 001.759-1.048l.489-.904A2 2 0 0110.004 4z"
      />
      <Circle cx={12} cy={13} r={3} />
    </Svg>
  );
});
