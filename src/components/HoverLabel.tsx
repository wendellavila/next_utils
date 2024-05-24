import { ButtonProps } from '../typing/props';

interface HoverLabelProps extends ButtonProps {
  wrap?: boolean;
  position?: 'top' | 'bottom';
}

export function HoverLabel(props: HoverLabelProps) {
  const { position, wrap, className, state, children } = props;

  const positionClassName = (() => {
    if (position === 'top') return 'top-10';
    return 'bottom-10';
  })();

  return (
    props.state !== 'disabled' && (
      <div
        className={`absolute left-1/2 hidden group-hover:inline
        ${positionClassName} ${className ?? ''}`}
      >
        <div
          className={`
          relative -left-1/2 rounded px-3 py-1
          text-center text-sm 
          ${wrap ? '' : 'whitespace-nowrap'}
          bg-[#616161EB] text-white
          `}
        >
          <span>{state === 'active' ? 'Página atual' : children}</span>
        </div>
      </div>
    )
  );
}
