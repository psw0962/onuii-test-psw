import { cartListAtom } from 'atoms';
import Frame from 'components/frame';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
// import { useEffect, useState } from 'react';

const Cart = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  console.log('cart', cartList);

  return (
    <Frame>
      <div>asd</div>
    </Frame>
  );
};

export default Cart;
