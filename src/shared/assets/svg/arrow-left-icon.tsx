import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const ArrowLeftIcon = memo((props: PropsType) => {
  const { color = '#000000', size = 24, strokeWidth = 2 } = props;

  return (
    <Svg
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      width={size}
    >
      <Path
        color={color}
        d="M19 12H5M12 19l-7-7 7-7"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
});
