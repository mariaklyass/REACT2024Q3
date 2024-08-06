import { Theme } from 'src/context/ThemeContext';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps {
  type: ButtonType;
  theme: Theme;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

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
