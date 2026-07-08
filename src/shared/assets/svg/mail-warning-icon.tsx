import Svg, { Path } from 'react-native-svg';

type PropsType = {
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export const MailWarningIcon = (props: PropsType) => {
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
        d="M22 10.5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12.5"
      />
      <Path
        stroke={color}
        strokeWidth={strokeWidth}
        d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7M20 14v4M20 22v.01"
      />
    </Svg>
  );
};
