import type { AppProps } from 'next/app';
import { StylesGlobal } from '../styles/StylesGlobal';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <StylesGlobal />
      <Component {...pageProps} />
    </>
  );
};

export default App;
