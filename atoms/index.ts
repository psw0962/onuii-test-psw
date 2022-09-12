import { atom } from 'recoil';

export interface Toast {
  filterKey: string;
  state: boolean;
}

export interface ProductList {
  availableCoupon?: boolean;
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
}

export interface cartList {
  count: number;
  data: ProductList[] | [];
}

// 장바구니 담은 목록
export const cartListAtom = atom<cartList[] | []>({
  key: 'cartList',
  default: [],
});

// 장바구니에서 체크한 목록
export const cartCheckedListAtom = atom<cartList[] | []>({
  key: 'cartCheckedList',
  default: [],
});

// toast 상태
export const toastAtom = atom<Toast>({
  key: 'toast',
  default: {
    filterKey: '',
    state: false,
  },
});
