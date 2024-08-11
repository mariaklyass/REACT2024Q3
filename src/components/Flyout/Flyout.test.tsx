import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Flyout from './Flyout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAll } from '../../store/selectedSlice';
import downloadCsv from '../../utils/downloader';

vi.mock('../../store/hooks');
vi.mock('../../utils/downloader');

describe('Flyout', () => {
  const mockDispatch = vi.fn();
  const mockDownloadCsv = vi.fn().mockReturnValue('mockUrl');

  beforeEach(() => {
    vi.resetAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (downloadCsv as jest.Mock).mockReturnValue(mockDownloadCsv());
  });

  it('should not render when no characters are selected', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    render(<Flyout />);

    expect(screen.queryByText(/items selected/i)).not.toBeInTheDocument();
  });

  it('should render correctly when characters are selected', () => {
    const selectedCharacters = [{ id: '1', name: 'Rick Sanchez' }];
    (useAppSelector as jest.Mock).mockReturnValue(selectedCharacters);

    render(<Flyout />);

    expect(screen.getByText(/1 items selected/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it('should dispatch unselectAll when "Unselect All" button is clicked', () => {
    const selectedCharacters = [{ id: '1', name: 'Rick Sanchez' }];
    (useAppSelector as jest.Mock).mockReturnValue(selectedCharacters);

    render(<Flyout />);

    const unselectButton = screen.getByText(/Unselect All/i);
    fireEvent.click(unselectButton);

    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });

  it('should generate the correct download link', () => {
    const selectedCharacters = [{ id: '1', name: 'Rick Sanchez' }];
    (useAppSelector as jest.Mock).mockReturnValue(selectedCharacters);

    render(<Flyout />);

    const downloadButton = screen.getByText('Download');
    const downloadLink = downloadButton.closest('a');

    expect(downloadLink).toHaveAttribute('download', '1_characters.csv');
    expect(downloadCsv).toHaveBeenCalledWith(selectedCharacters);
  });
});
