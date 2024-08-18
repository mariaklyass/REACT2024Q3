import './password-indicator.scss';

interface PasswordStrengthIndicatorProps {
  description: string;
}

const PasswordIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  description,
}) => {
  const getStrengthColor = (description: string): string => {
    switch (description) {
      case 'poor':
        return 'red';
      case 'weak':
        return 'orange';
      case 'medium':
        return 'yellow';
      case 'strong':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getStrengthWidth = (description: string): string => {
    switch (description) {
      case 'poor':
        return '25%';
      case 'weak':
        return '50%';
      case 'medium':
        return '67%';
      case 'strong':
        return '100%';
      default:
        return '0';
    }
  };

  const strengthColor = getStrengthColor(description);
  const strengthWidth = getStrengthWidth(description);

  return (
    <div className="password-strength-indicator">
      <div
        className="strength-bar"
        style={{
          width: strengthWidth,
          backgroundColor: strengthColor,
        }}
      />
      <div className="strength-label">{description}</div>
    </div>
  );
};

export default PasswordIndicator;
