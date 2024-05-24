/* Shared prop definitions */

export interface ButtonProps extends ComponentProps {
  ariaLabel?: string;
  onClick?: () => void;
  state?: 'disabled' | 'active' | 'normal';
}

export interface ComponentProps {
  id?: string;
  children?: React.ReactNode;
  className?: string;
}
