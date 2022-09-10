import type { AppProps } from 'next/app';
import GlobalStyle from 'styles/global-style';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 모바일에서 input focus할 때 확대방지 */}
        <meta
          name="viewport"
          content="width=device-width, content='width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=2.0; user-scalable=1;"
        />
        <title>onuii | psw</title>
      </Head>

      <GlobalStyle />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
