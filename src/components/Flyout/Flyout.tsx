'use client';

import { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAll } from '../../store/selectedSlice';
import downloadCsv from '../../utils/downloader';

function Flyout() {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    state => state.selected.selectedCharacters
  );

  const csvUrl = useMemo(() => {
    if (selectedCharacters.length > 0) {
      return downloadCsv(selectedCharacters);
    }
    return '';
  }, [selectedCharacters]);

  if (selectedCharacters.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  return (
    <div className="flyout" style={{ ...(theme as React.CSSProperties) }}>
      <p>{`${selectedCharacters.length} items selected`}</p>
      <button type="button" onClick={handleUnselectAll}>
        Unselect All
      </button>
      <a href={csvUrl} download={`${selectedCharacters.length}_characters.csv`}>
        <button type="button">Download</button>
      </a>{' '}
    </div>
  );
}

export default Flyout;
