import { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore;
}

const renderWithProviders = (
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) => {
  const { store = makeStore(), ...renderOptions } = extendedRenderOptions;

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export default renderWithProviders;
