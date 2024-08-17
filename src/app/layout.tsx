import './styles/globals.css';
import StoreProvider from 'src/store/storeProvider';

import Header from 'src/components/Header/Header';
import { ThemeProvider } from 'src/context/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app">
        <StoreProvider>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
