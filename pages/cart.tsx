import { useEffect, useState } from 'react';
import { cartCheckedListAtom, cartListAtom } from 'atoms';
import { useRecoilState } from 'recoil';
import Frame from 'components/frame';
import CartList from 'components/cart-list';
import Font from 'components/font';
import styled from 'styled-components';
import Line from 'components/line';
import axios from 'axios';
import { useRouter } from 'next/router';

interface CouponList {
  type: string;
  name: string;
  discountRate: number;
}

const Cart = () => {
  const router = useRouter();
  const [couponList, setCouponList] = useState<CouponList[] | null>(null);
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const [cartCheckedList, setCartCheckedList] = useRecoilState(cartCheckedListAtom);

  const getCouponList = async () => {
    try {
      const response = await axios.get('https://doby.seoltab.workers.dev/');
      const deepCopyData = structuredClone(response?.data?.data);

      setCouponList(deepCopyData);
    } catch (e) {
      console.log(e);
    }
  };

  const makeResultPrice = () => {
    let result = 0;
    console.log(couponList);

    cartCheckedList.forEach((x: any) => {
      result = result + x.data.price * x.count;
    });

    return result;
  };

  useEffect(() => {
    getCouponList();
  }, []);

  return (
    <Frame>
      <HeaderWrapper>
        <Font size={16}>선택</Font>
        <Font size={16}>상품정보</Font>
        <Font size={16}>수량</Font>
      </HeaderWrapper>

      <Line />

      {cartList.length === 0 && (
        <NoContentWrapper>
          <Font size={18}>장바구니에 담긴 상품이 없습니다.</Font>
          <CustomButton onClick={() => router.push('/enrollment')}>상품 보러 가기</CustomButton>
        </NoContentWrapper>
      )}

      <CardListWrapper>
        {cartList.map((item: any) => {
          return <CartList key={item?.data?.id} item={item} />;
        })}
      </CardListWrapper>

      <Line />

      <DiscountFrame>
        <DiscountWrapper>
          <input type="radio" id="discountAmount" name="discount" value="정액 할인" />
          <label htmlFor="discountAmount">정액 할인</label>
        </DiscountWrapper>

        <DiscountWrapper>
          <input type="radio" id="discountRate" name="discount" value="비율 할인" />
          <label htmlFor="discountRate">비율 할인</label>
        </DiscountWrapper>
      </DiscountFrame>

      <Line />

      <div>전체금액:{makeResultPrice()}</div>
    </Frame>
  );
};

export default Cart;

const DiscountFrame = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`;

const NoContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
`;

const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DiscountWrapper = styled.div`
  display: flex;
  align-items: center;

  label {
    transform: translateY(2px);
    font-size: 1.6rem;
  }
`;

const CustomButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
