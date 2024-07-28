import { useLocation, useNavigate } from 'react-router-dom';
import './CharacterCardDetails.css';
import { useEffect, useRef } from 'react';
import Loader from '../UtilityComponents/Loader';
import FallbackUI from '../UtilityComponents/FallbackUI';
import { useFetchCharacterByIdQuery } from '../../slices/apiSlice';

function CharacterCardDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('details');

  const cardRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    searchParams.delete('details');
    navigate({ search: searchParams.toString() });
  };

  const {
    data: character,
    error,
    isFetching,
  } = useFetchCharacterByIdQuery(id!, { skip: !id });

  useEffect(() => {
    if (!id) {
      navigate('/');
    }
  }, [id, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!id) return null;

  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
    return <FallbackUI />;
  }

  return (
    character && (
      <div ref={cardRef} className="character-card-details">
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <h1>{character.name}</h1>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <img src={character.image} alt={character.name} />
      </div>
    )
  );
}

export default CharacterCardDetails;
