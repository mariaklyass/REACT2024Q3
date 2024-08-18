import { SuggestionsProps } from './types';

const Suggestions = ({ countries, updateValue }: SuggestionsProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target;
    if (target instanceof HTMLElement) {
      const value = target.textContent;
      value && updateValue(value);
    }
  };

  return (
    <div className="">
      {countries.map((item, index) => {
        return (
          <div key={index} onClick={handleClick} className="">
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
