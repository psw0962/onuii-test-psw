import type { AppProps } from 'next/app';
import Head from 'next/head';
import styled from 'styled-components';
import Navigation from 'components/navigation';
import GlobalStyle from 'styles/global-style';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Frame>
        <Head>
          {/* 모바일에서 input focus할 때 확대방지 */}
          <meta
            name="viewport"
            content="width=device-width, content='width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=2.0; user-scalable=1;"
          />
          <title>onuii | psw</title>
        </Head>

        <GlobalStyle />

        <ComponentFrame>
          <Navigation />
          <Component {...pageProps} />
        </ComponentFrame>
      </Frame>
    </RecoilRoot>
  );
};

export default MyApp;

const Frame = styled.div`
  display: flex;
  justify-content: center;
`;

const ComponentFrame = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 450px;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 8px;
`;
