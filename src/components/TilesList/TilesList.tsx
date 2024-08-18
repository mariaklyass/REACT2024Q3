import { useAppSelector } from '../../store/hooks';
import Tile from '../Tile/Tile';
import './tiles-list.scss';

export default function TilesList() {
  const tiles = useAppSelector(state => state.tiles.tiles);

  return (
    <section>
      {tiles.map((tile, index) => {
        if (index === tiles.length - 1) {
          return <Tile key={index} item={tile} isLast={true}></Tile>;
        }
        return <Tile key={index} item={tile}></Tile>;
      })}
    </section>
  );
}
