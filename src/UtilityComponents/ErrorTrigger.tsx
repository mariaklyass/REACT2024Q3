import { useState } from 'react';
import './ErrorTrigger.css';

function ErrorTrigger() {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    try {
      throw new Error('Simulated error');
    } catch (error) {
      setHasError(true);
    }
  };

  if (hasError) {
    throw new Error('Simulated error');
  }

  return (
    <button type="button" onClick={handleClick} className="trigger-btn">
      Trigger Button
    </button>
  );
}

export default ErrorTrigger;
