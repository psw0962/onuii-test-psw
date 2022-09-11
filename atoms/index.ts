import { atom, selector } from 'recoil';

interface ProductList {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
}

export const cartListAtom = atom<ProductList[] | []>({
  key: 'cartList',
  default: [],
});
