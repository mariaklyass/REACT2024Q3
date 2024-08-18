import { Options } from '../../models/options';
import { SelectProps } from '../../models/types';

const Select = ({ children, title, name }: SelectProps) => {
  return (
    <label className="min-w-full">
      {title}
      <select name={name} className="">
        <Options />
      </select>
      {children}
    </label>
  );
};

export default Select;
