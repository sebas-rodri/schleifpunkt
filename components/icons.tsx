import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
export const ChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Icon>
);
export const ChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 6l6 6-6 6" />
  </Icon>
);
export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);
export const Plus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
export const Minus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);
export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);
export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);
export const Cart = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 4h2.5l2.2 10.5h10.6L21 7.5H6.6" />
    <circle cx="9.5" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </Icon>
);
export const Search = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </Icon>
);
export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h4l1.5 4.5-2.5 1.5a11 11 0 0 0 6 6l1.5-2.5L20 15v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  </Icon>
);
export const Pin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.8" r="2.3" />
  </Icon>
);
export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
    <path d="M4 7l8 6 8-6" />
  </Icon>
);
export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);
export const Calendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
    <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
  </Icon>
);
export const Store = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 10v10h16V10M3 10l2-5h14l2 5M3 10h18M10 20v-5h4v5" />
  </Icon>
);
export const Tag = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9-8-8z" />
    <circle cx="8" cy="8" r="1.4" />
  </Icon>
);
export const Chat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
  </Icon>
);
export const Box = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
    <path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" />
  </Icon>
);
