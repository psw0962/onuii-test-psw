import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Font from 'components/font';
import { useRecoilState } from 'recoil';
import { cartCheckedListAtom, cartListAtom } from 'atoms';

const CartList = ({ item }: any) => {
  const [isChecked, setChecked] = useState(false);
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const [cartCheckedList, setCartCheckedList] = useRecoilState(cartCheckedListAtom);

  const checkHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setChecked(!isChecked);

    if (!!cartCheckedList?.find((x: any) => x.data.id === item?.data?.id)) {
      setCartCheckedList(cartCheckedList.filter((y: any) => y.data.id !== item?.data?.id));
      return;
    }

    setCartCheckedList((prev: any) => {
      return [...prev, { data: item?.data, count: item?.count }];
    });
  };

  useEffect(() => {
    const cartListIndex = cartList?.findIndex((x: any) => x?.data?.id === item?.data?.id);
    const cartCheckedListIndex = cartCheckedList?.findIndex(
      (x: any) => x?.data?.id === item?.data?.id
    );

    // cartList
    if (cartList[cartListIndex]?.count === 0) {
      const temp = {
        data: cartList[cartListIndex]?.data,
        count: 1,
      };
      setCartList((prev: any) => {
        return [...prev.slice(0, cartListIndex), temp, ...prev.slice(cartListIndex + 1)];
      });
      return alert('1개 미만의 수량은 지정할 수 없습니다.');
    }

    // cartCheckedList
    if (cartCheckedListIndex >= 0 && cartCheckedList[cartCheckedListIndex]?.count === 0) {
      const temp = {
        data: cartCheckedList[cartCheckedListIndex]?.data,
        count: 1,
      };

      setCartCheckedList((prev: any) => {
        return [
          ...prev.slice(0, cartCheckedListIndex),
          temp,
          ...prev.slice(cartCheckedListIndex + 1),
        ];
      });
    }
  }, [cartList]);

  useEffect(() => {
    return () => {
      setCartCheckedList([]);
    };
  }, []);

  return (
    <Frame>
      <input type="checkbox" checked={isChecked} onChange={(e) => checkHandler(e)} />

      <ProductWrapper>
        <ImageWrapper>
          <CustomImage
            src={item?.data?.image}
            alt={`product${item?.data?.id}`}
            priority={true}
            layout="fill"
          />
        </ImageWrapper>

        <ProductInfoWrapper>
          <Font size={16}>{item?.data?.name}</Font>
          <Font size={16}>
            {item?.data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Font>
        </ProductInfoWrapper>
      </ProductWrapper>

      <CountInput
        type="text"
        value={item.count}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          const cartListIndex = cartList?.findIndex((x: any) => x?.data?.id === item?.data?.id);
          const cartCheckedListIndex = cartCheckedList?.findIndex(
            (x: any) => x?.data?.id === item?.data?.id
          );

          // cartList
          const temp = {
            data: cartList[cartListIndex]?.data,
            count: Number(e.target.value),
          };
          setCartList((prev: any) => {
            return [...prev.slice(0, cartListIndex), temp, ...prev.slice(cartListIndex + 1)];
          });

          // cartCheckedList
          if (cartCheckedListIndex >= 0) {
            console.log('here');
            const temp = {
              data: cartCheckedList[cartCheckedListIndex]?.data,
              count: Number(e.target.value),
            };

            setCartCheckedList((prev: any) => {
              return [
                ...prev.slice(0, cartCheckedListIndex),
                temp,
                ...prev.slice(cartCheckedListIndex + 1),
              ];
            });
          }

          e.target.select();
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
