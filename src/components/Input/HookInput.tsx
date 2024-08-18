import { InputProps } from '../../models/types';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface HookInputProps extends InputProps {
  register: ReturnType<UseFormRegister<FieldValues>>;
}

const HookInput: React.FC<HookInputProps> = ({
  register,
  title,
  type,
  accept,
  children,
}) => {
  return (
    <label>
      <span>{title}</span>
      <input {...register} type={type} accept={accept} />
      {children}
    </label>
  );
};

export default HookInput;
