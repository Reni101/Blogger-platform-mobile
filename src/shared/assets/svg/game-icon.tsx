import Svg, { Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const GameIcon = (props: PropsType) => {
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
        d="M14.5 17.5L3 6 3 3 6 3 17.5 14.5"
      />
      <Path stroke={color} strokeWidth={strokeWidth} d="M13 19L19 13" />
      <Path stroke={color} strokeWidth={strokeWidth} d="M16 16L20 20" />
      <Path stroke={color} strokeWidth={strokeWidth} d="M19 21L21 19" />
      <Path
        stroke={color}
        strokeWidth={strokeWidth}
        d="M14.5 6.5L18 3 21 3 21 6 17.5 9.5"
      />
      <Path stroke={color} strokeWidth={strokeWidth} d="M5 14L9 18" />
      <Path stroke={color} strokeWidth={strokeWidth} d="M7 17L4 20" />
      <Path stroke={color} strokeWidth={strokeWidth} d="M3 19L5 21" />
    </Svg>
  );
};
