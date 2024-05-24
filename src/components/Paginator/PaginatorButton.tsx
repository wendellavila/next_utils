import { ButtonProps } from '../../typing/props';

export function PaginatorButton(props: ButtonProps) {
  const { children, className, ariaLabel, state, onClick } = props;

  return (
    <button
      disabled={state === 'disabled'}
      aria-label={ariaLabel}
      className={`
      min-w-7 px-1 py-0.5 m-1 border rounded-[0.2rem]
      ${state === 'active' ? 'border-stone-400 bg-stone-100' : ''}
       ${state === 'disabled' ? 'border-stone-200 text-stone-300' : ''}
       ${
         state === 'normal' || !state
           ? 'border-stone-300 hover:bg-stone-100 hover:border hover:border-stone-400 active:bg-stone-200'
           : ''
       }
       ${className ?? ''}`}
      onClick={state !== 'active' && state !== 'disabled' ? onClick : undefined}
    >
      {children}
    </button>
  );
}
