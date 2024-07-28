import { ButtonProps } from 'src/utils/types';

function Button({ theme, type, onClick, children }: ButtonProps) {
  return (
    <button
      type="button"
      className={`button button--${type}`}
      onClick={onClick}
      style={{ ...(theme as React.CSSProperties) }}
    >
      {children}
    </button>
  );
}

export default Button;
