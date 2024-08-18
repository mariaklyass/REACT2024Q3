import { TileProps } from '../../models/types';
import './tile.scss';

export default function Tile({ item, isLast }: TileProps) {
  return (
    <div className={`tile ${isLast ? 'tile-last' : ''}`}>
      <div>
        <ul>
          <li>Name: {item.name}</li>
          <li>Age: {item.age}</li>
          <li>Email: {item.email}</li>
          <li>Gender: {item.gender}</li>
          <li>Country: {item.country}</li>
          <li>Password: {item.password}</li>
        </ul>
        <img
          src={typeof item.picture === 'string' ? item.picture : ''}
          alt="Profile"
        />
      </div>
    </div>
  );
}
