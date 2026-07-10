import { memo } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};
export const PasswordIcon = memo( (props: PropsType)=> {
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
        strokeWidth={strokeWidth}
        stroke={color}
        d="M2.586 17.414A2 2 0 002 18.828V21a1 1 0 001 1h3a1 1 0 001-1v-1a1 1 0 011-1h1a1 1 0 001-1v-1a1 1 0 011-1h.172a2 2 0 001.414-.586l.814-.814a6.5 6.5 0 10-4-4z"
      />
      <Circle cx={16.5} cy={7.5} r={0.5} fill="currentColor" />
    </Svg>
  );
});
