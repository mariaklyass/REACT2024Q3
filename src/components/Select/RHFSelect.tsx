import { RHFSelectProps } from '../../models/types';
import { Options } from '../../models/options';

const RHFSelect: React.FC<RHFSelectProps> = ({ title, children, register }) => {
  return (
    <label className="">
      <span className="">{title}</span>
      <select {...register} className="">
        <Options />
      </select>
      {children}
    </label>
  );
};

export default RHFSelect;
