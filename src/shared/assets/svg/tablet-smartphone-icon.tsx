import Svg, { Path, Rect } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const TabletSmartphoneIcon = (props: PropsType) => {
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
      <Rect width={10} height={14} x={3} y={8} rx={2} />
      <Path
        stroke={color}
        strokeWidth={strokeWidth}
        d="M5 4a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2h-2.4M8 18h.01"
      />
    </Svg>
  );
};
