import { useTheme } from '../../context/ThemeContext';

interface CharacterCardProps {
  id: string;
  name: string;
  image: string;
  onClick: (id: string) => void;
}

function CharacterCard({
  id,
  name,
  image,
  onClick,
}: CharacterCardProps): JSX.Element {
  const { theme } = useTheme();
  return (
    <li className="card" style={{ ...(theme as React.CSSProperties) }}>
      <img src={image} alt={name} />
      {name}
      <button type="button" onClick={() => onClick(id)}>
        Details
      </button>
    </li>
  );
}

export default CharacterCard;
