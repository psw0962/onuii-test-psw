import { useEffect, useState } from 'react';
import { cartListAtom } from 'atoms';
import { useRecoilState } from 'recoil';
import Frame from 'components/frame';
import CartList from 'components/cart-list';
import Font from 'components/font';
import styled from 'styled-components';
import Line from 'components/line';
import axios from 'axios';

interface CouponList {
  type: string;
  name: string;
  discountRate: number;
}

interface ProductList {
  availableCoupon?: boolean;
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
}

const Cart = () => {
  const [couponList, setCouponList] = useState<CouponList[] | null>(null);
  const [cartList, setCartList] = useRecoilState(cartListAtom);

  const [result, setResult] = useState([]);
  console.log(result);

  const getCouponList = async () => {
    try {
      const response = await axios.get('https://doby.seoltab.workers.dev/');
      const deepCopyData = structuredClone(response?.data?.data);

      setCouponList(deepCopyData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCouponList();
  }, []);

  return (
    <Frame>
      <HeaderWrapper>
        <Font size={16}>선택</Font>
        <Font size={16}>상품정보</Font>
        <Font size={16}>갯수</Font>
      </HeaderWrapper>

      <Line />

      {cartList?.data?.map((item) => {
        return <CartList key={item.id} item={item} result={result} setResult={setResult} />;
      })}
    </Frame>
  );
};

export default Cart;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`;
