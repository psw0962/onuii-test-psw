/* eslint-disable prefer-const */
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
  discountRate?: number;
  discountAmount?: number;
}

const Cart = () => {
  const router = useRouter();

  // 쿠폰 리스트
  const [couponList, setCouponList] = useState<CouponList[] | null>(null);

  // 할인 선택 상태
  const [discount, setDiscount] = useState<string>('적용 안함');

  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const [cartCheckedList, setCartCheckedList] = useRecoilState(cartCheckedListAtom);

  // 쿠폰 리스트 API
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

  // 할인 상품 제외 목록 함수
  const unDiscountProduct = () => {
    let result: string[] = [];

    cartCheckedList.forEach((x: any) => {
      if (x.data.availableCoupon !== undefined) {
        result.push(x.data?.name);
      }
    });

    return result;
  };

  // 결제 금액 함수
  const makeResultPrice = () => {
    let result = 0; // 최종 결제 금액
    let availableResult = 0; // 할인 가능한 목록 합계 금액
    let unAvailableResult = 0; // 할인 불가능한 목록 합계 금액
    const available: number[] = []; // 할인 가능한 목록
    const unAvailable: number[] = []; // 할인 불가능한 목록

    cartCheckedList.forEach((x: any) => {
      if (x.data.availableCoupon === undefined) {
        available.push(x.data.price * x.count);
      } else {
        unAvailable.push(x.data.price * x.count);
      }
    });

    available.forEach((x) => {
      availableResult = availableResult + x;
    });

    unAvailable.forEach((x) => {
      unAvailableResult = unAvailableResult + x;
    });

    if (discount === '적용 안함') {
      result = availableResult + unAvailableResult;
      return result;
    }

    if (discount === '정액 할인') {
      let temp = availableResult - 50000;

      if (temp > 0) {
        result = temp + unAvailableResult;
        return result;
      } else {
        result = unAvailableResult;
      }

      return result;
    }

    if (discount === '비율 할인') {
      let temp = availableResult - availableResult * 0.15;

      if (temp > 0) {
        result = temp + unAvailableResult;
        return result;
      } else {
        result = unAvailableResult;
      }

      return result;
    }
  };

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
        <Font size={21} fontWeight={600}>
          쿠폰 적용
        </Font>

        <DisCountInnerWrapper>
          <DiscountWrapper>
            <input
              type="radio"
              id="unDiscount"
              name="discount"
              value="적용 안함"
              checked={discount === '적용 안함'}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <label htmlFor="unDiscount">적용 안함</label>
          </DiscountWrapper>

          <DiscountWrapper>
            <input
              type="radio"
              id="discountAmount"
              name="discount"
              value="정액 할인"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <label htmlFor="discountAmount">정액 할인</label>
          </DiscountWrapper>

          <DiscountWrapper>
            <input
              type="radio"
              id="discountRate"
              name="discount"
              value="비율 할인"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <label htmlFor="discountRate">비율 할인</label>
          </DiscountWrapper>
        </DisCountInnerWrapper>
      </DiscountFrame>

      <Line />

      <ReasultFrame>
        {unDiscountProduct().length > 0 && (
          <UnDiscountListWrapper>
            <div>
              {unDiscountProduct().map((x: any, index: number) => {
                return (
                  <Font size={18} fontWeight={600} key={index}>
                    {x} {unDiscountProduct().length - 1 !== index && ','}
                  </Font>
                );
              })}
            </div>

            <Font size={16}>위 상품은 할인 상품에 포함되지 않습니다.</Font>
          </UnDiscountListWrapper>
        )}

        <Font size={21} fontWeight={600} margin="4rem 0 0 0">
          {`결제 금액 :
          ${makeResultPrice()
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원`}
        </Font>
      </ReasultFrame>
    </Frame>
  );
};

export default Cart;

// frame
const DiscountFrame = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;

const ReasultFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 4rem;
`;

// wrapper
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

const DisCountInnerWrapper = styled.div`
  display: flex;
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

const UnDiscountListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  div {
    display: flex;
    gap: 1rem;
  }
`;

// component
const CustomButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
