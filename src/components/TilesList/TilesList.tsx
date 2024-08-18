import { useAppSelector } from '../../store/hooks';
import Tile from '../Tile/Tile';
import './tiles-list.scss';

export default function TilesList() {
  const tiles = useAppSelector(state => state.tiles.tiles);

  return (
    <section className="tiles-list">
      {tiles
        .slice()
        .reverse()
        .map((tile, index) => {
          const isLast = index === 0;
          return <Tile key={index} item={tile} isLast={isLast} />;
        })}
    </section>
  );
}
