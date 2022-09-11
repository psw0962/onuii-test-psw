import { countAtom } from 'atoms';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Font from 'components/font';

const CartList = (props: any) => {
  const { item, result, setResult } = props;
  const [count, setCount] = useState<number | string>(1);
  const [isChecked, setChecked] = useState(false);

  const checkHandler = (e: React.FormEvent<HTMLInputElement>, item: any, result: any) => {
    setChecked(!isChecked);

    if (!!result?.find((x: any) => x.data.id === item.id)) {
      setResult(result.filter((y: any) => y.data.id !== item.id));
      return;
    }

    setResult((prev: any) => {
      return [...prev, { data: item, count: count }];
    });
  };

  useEffect(() => {
    if (count === 0) {
      setCount(1);
      alert('1개 미만의 수량은 지정할 수 없습니다.');
    }
  }, [count]);

  return (
    <Frame>
      <input type="checkbox" checked={isChecked} onChange={(e) => checkHandler(e, item, result)} />

      <ProductWrapper>
        <ImageWrapper>
          <CustomImage src={item.image} alt={`product${item.id}`} priority={true} layout="fill" />
        </ImageWrapper>

        <ProductInfoWrapper>
          <Font size={16}>{item.name}</Font>
          <Font size={16}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Font>
        </ProductInfoWrapper>
      </ProductWrapper>

      <CountInput
        type="text"
        value={count}
        onChange={(e) => {
          setCount(Number(e.target.value));
        }}
      />
    </Frame>
  );
};

export default CartList;

// frame
const Frame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 4rem;
`;

// wrapper
const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// component
const CustomImage = styled(Image)`
  position: absolute;
  border-radius: 10px;
`;

const CountInput = styled.input`
  width: 30px;
`;
