import { useRouter } from 'next/router';
import styled from 'styled-components';
import Font from './font';

const Navigation = () => {
  const router = useRouter();
  return (
    <Frame>
      <div></div>

      <Font size={21} pointer={true} fontWeight={700} onClick={() => router.push('/')}>
        Onuii
      </Font>

      <Font size={21} pointer={true} fontWeight={700} onClick={() => router.push('/cart')}>
        Cart
      </Font>
    </Frame>
  );
};

export default Navigation;

const Frame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  padding: 0 2rem;
`;
