import { InputProps } from '../../models/types';

const UncontrolledInput = ({
  title,
  type,
  accept,
  name,
  handleChange,
  children,
}: InputProps) => (
  <div>
    <label>
      {title}
      <input name={name} type={type} accept={accept} onChange={handleChange} />
    </label>
    {children}
  </div>
);

export default UncontrolledInput;
