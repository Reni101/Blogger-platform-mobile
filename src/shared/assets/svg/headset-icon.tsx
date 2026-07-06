import Svg, { Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const HeadsetIcon = (props: PropsType) => {
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
        stroke={color}
        strokeWidth={strokeWidth}
        d="M3 11h3a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-5zm0 0a9 9 0 1118 0m0 0v5a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"
      />
      <Path
        stroke={color}
        strokeWidth={strokeWidth}
        d="M21 16v2a4 4 0 01-4 4h-5"
      />
    </Svg>
  );
};
