import { atom, selector } from 'recoil';

interface cartList {
  count: number;
  data: ProductList[] | [];
}

interface ProductList {
  availableCoupon?: boolean;
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
}

export const cartListAtom = atom<cartList>({
  key: 'cartList',
  default: {
    count: 0,
    data: [],
  },
});

export const toastAtom = atom({
  key: 'toast',
  default: {
    filterKey: '',
    state: false,
  },
});

export const countAtom = atom<number>({
  key: 'count',
  default: 1,
});
