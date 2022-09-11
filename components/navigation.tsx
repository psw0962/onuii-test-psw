import { useRouter } from 'next/router';
import styled from 'styled-components';
import Font from './font';

const Navigation = () => {
  const router = useRouter();
  return (
    <Frame>
      <CustomFont
        className="left"
        size={21}
        pointer={true}
        fontWeight={700}
        onClick={() => router.push('/enrollment')}
      >
        상품
      </CustomFont>

      <CustomFont
        className="center"
        size={21}
        pointer={true}
        fontWeight={700}
        onClick={() => router.push('/')}
      >
        Onuii
      </CustomFont>

      <CustomFont
        className="right"
        size={21}
        pointer={true}
        fontWeight={700}
        onClick={() => router.push('/cart')}
      >
        Cart
      </CustomFont>
    </Frame>
  );
};

export default Navigation;

const Frame = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  height: 5rem;
  padding: 0 2rem;
`;

const CustomFont = styled(Font)`
  display: flex;
  align-items: center;

  &.left {
    justify-content: flex-start;
  }
  &.center {
    justify-content: center;
  }
  &.right {
    justify-content: flex-end;
  }
`;
