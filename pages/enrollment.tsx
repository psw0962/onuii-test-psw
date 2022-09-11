import axios from 'axios';
import Font from 'components/font';
import Pagination from 'components/pagination';
import { NextPage } from 'next';
import Image from 'next/image';

import styled from 'styled-components';
import Frame from 'components/frame';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartListAtom } from 'atoms';

interface ProductList {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
}

const Enrollment: NextPage = () => {
  const [productList, setProductList] = useState<ProductList[] | null>(null);
  const [cartList, setCartList] = useRecoilState(cartListAtom);

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
    console.log(cartList.find((x) => x.id === product.id));

    if (!!cartList.find((x) => x.id === product.id)) {
      return;
    }

    setCartList((prev: ProductList[]) => {
      return [...prev, product];
    });
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    console.log(cartList);
  }, [cartList]);

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
                  담기
                </Font>
              </AddCartWrapper>
            </ProductCard>
          );
        })}
      </GridFrame>

      <Pagination total={productList?.length} limit={limit} page={page} setPage={setPage} />
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
