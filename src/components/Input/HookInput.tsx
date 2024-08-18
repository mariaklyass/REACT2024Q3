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
    <label className="">
      <span className="">{title}</span>
      <input {...register} type={type} accept={accept} className="" />
      {children}
    </label>
  );
};

export default HookInput;
