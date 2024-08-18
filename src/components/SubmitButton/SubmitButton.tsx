import './submit-button.scss';

interface ButtonProps {
  isDisabled?: boolean;
}

export default function SubmitButton({ isDisabled = false }: ButtonProps) {
  return (
    <button className="subnit-btn" type="submit" disabled={isDisabled}>
      Submit
    </button>
  );
}
