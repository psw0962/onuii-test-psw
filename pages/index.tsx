import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Frame onClick={() => router.push('/enrollment')}>
      <CustomButton>상품 페이지로 이동하기</CustomButton>
    </Frame>
  );
};

export default Home;

const Frame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

const CustomButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
