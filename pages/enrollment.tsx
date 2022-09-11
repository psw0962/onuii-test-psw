import axios from 'axios';
import Font from 'components/font';
import Pagination from 'components/pagination';
import { NextPage } from 'next';
import Image from 'next/image';

import styled from 'styled-components';
import Frame from 'components/frame';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartListAtom, toastAtom } from 'atoms';
import Toast from 'components/toast';

interface cartList {
  count: number;
  data: ProductList[] | [];
}

interface ProductList {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
}

const Enrollment: NextPage = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);
  const [toast, setToast] = useRecoilState(toastAtom);
  const [productList, setProductList] = useState<ProductList[] | null>(null);

  console.log('outside', cartList?.data);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getProductList = async () => {
    try {
      const response = await axios.get('https://eden.seoltab.workers.dev/');
      const deepCopyData = structuredClone(response?.data?.data);

      setProductList(deepCopyData?.sort((a: ProductList, b: ProductList) => b.rating - a.rating));
    } catch (e) {
      console.log(e);
    }
  };

  const onClickAddCart = (product: ProductList) => {
    // 갯수 제한
    if (
      !!cartList?.data?.find((item) => item.id === product.id) !== true &&
      cartList?.data?.length + 1 > 3
    ) {
      setToast(() => {
        return { filterKey: 'length', state: true };
      });
      return;
    }

    // 빼기
    if (!!cartList?.data?.find((item) => item.id === product.id)) {
      setCartList((prev: cartList) => {
        return {
          count: prev.count - 1,
          data: cartList?.data?.filter((item) => item.id !== product.id),
        };
      });

      setToast(() => {
        return { filterKey: 'delete', state: true };
      });

      return;
    }

    // 담기
    if (cartList?.data?.find((item) => item.id === product.id) === undefined) {
      setCartList((prev: cartList) => {
        return { count: prev.count + 1, data: [...prev.data, product] };
      });

      setToast(() => {
        return { filterKey: 'add', state: true };
      });
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <Frame>
      <GridFrame>
        {productList?.slice(offset, offset + limit)?.map((product, index) => {
          return (
            <ProductCard key={product.id}>
              <ImageWrapper>
                <CustomImage
                  src={product.image}
                  alt={`productImage${index}`}
                  priority={true}
                  layout="fill"
                />
              </ImageWrapper>
              <Font size={16}>{product.name}</Font>
              <CustomFont size={16}>
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </CustomFont>

              <AddCartWrapper className="hide">
                <Font size={16} fontWeight={700} onClick={() => onClickAddCart(product)}>
                  {!!cartList?.data?.find((item) => item.id === product.id) ? '빼기' : '담기'}
                </Font>
              </AddCartWrapper>
            </ProductCard>
          );
        })}
      </GridFrame>

      <Pagination total={productList?.length} limit={limit} page={page} setPage={setPage} />

      {toast.filterKey === 'add' && <Toast value="선택한 상품이 장바구니에 담겼습니다" />}
      {toast.filterKey === 'delete' && <Toast value="선택한 상품이 장바구니에서 삭제되었습니다" />}
      {toast.filterKey === 'length' && (
        <Toast value="장바구니에는 최대 3개의 상품이 담길 수 있습니다" />
      )}
    </Frame>
  );
};

export default Enrollment;

// frame
const GridFrame = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 4rem;
  flex-direction: column;
`;

// wrapper
const ImageWrapper = styled.div`
  position: relative;
  height: 20rem;
  z-index: 1;
`;

const AddCartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
  width: calc(100% - 2rem);
  height: 10rem;

  z-index: 10;
  transition: all 0.3s;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

// component
const CustomImage = styled(Image)`
  position: absolute;
`;

const CustomFont = styled(Font)`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const ProductCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 8px;
  border-radius: 10px;
  cursor: pointer;

  transition: all 0.3s;

  .hide {
    visibility: hidden;
    opacity: 0;
  }

  &:hover .hide {
    visibility: visible;
    opacity: 1;
  }
`;
