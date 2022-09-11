import axios from 'axios';
import Font from 'components/font';
import Pagination from 'components/pagination';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ProductList {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
}

const Enrollment: NextPage = () => {
  const [productList, setProductList] = useState<ProductList[] | null>(null);

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
            </ProductCard>
          );
        })}
      </GridFrame>

      <Pagination total={productList?.length} limit={limit} page={page} setPage={setPage} />
    </Frame>
  );
};

export default Enrollment;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 2rem 2rem;
`;

const GridFrame = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 4rem;
  flex-direction: column;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 8px;
  border-radius: 10px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 20rem;
`;

const CustomImage = styled(Image)`
  position: absolute;
`;

const CustomFont = styled(Font)`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;
