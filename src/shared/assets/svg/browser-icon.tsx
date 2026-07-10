import { memo } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const BrowserIcon = memo((props: PropsType) => {
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
      <Circle cx={12} cy={12} r={10} />
      <Path
        stroke={color}
        strokeWidth={strokeWidth}
        d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20M2 12h20"
      />
    </Svg>
  );
});
