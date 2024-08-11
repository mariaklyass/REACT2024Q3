import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import Layout from './Layout';
import renderWithProviders from '../../tests/renderWithProviders';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '',
    query: {},
    asPath: '',
  }),
}));

describe('Layout Component', () => {
  it('renders children correctly', () => {
    renderWithProviders(
      <Layout>
        <div data-testid="child">Child Component</div>
      </Layout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
