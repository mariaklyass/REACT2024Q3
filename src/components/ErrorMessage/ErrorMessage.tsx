import { ReactNode } from 'react';
import './error-message.scss';

interface ErrorProps {
  children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorProps) {
  return <div className="error-message">{children}</div>;
}
