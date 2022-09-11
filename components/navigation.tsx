import { useRouter } from 'next/router';
import styled from 'styled-components';
import Font from './font';

const Navigation = () => {
  const router = useRouter();
  return (
    <Frame>
      <Font size={21} pointer={true} onClick={() => router.push('/')}>
        Onuii
      </Font>
    </Frame>
  );
};

export default Navigation;

const Frame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
`;
