import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import Font from 'components/font';

interface Props {
  total: number | undefined;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = (props: Props) => {
  const { total, limit, page, setPage } = props;
  const numPages = total && Math.ceil(total / limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <Frame>
      {numPages &&
        Array(numPages)
          .fill(0)
          .map((_, index) => (
            <CustomFont
              key={index}
              active={index + 1 === page}
              size={16}
              pointer={true}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </CustomFont>
          ))}
    </Frame>
  );
};

export default Pagination;

const Frame = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
`;

const CustomFont = styled(Font)<{ active: boolean }>`
  padding: 1rem;
  border: ${(props) => (props.active ? '1px solid #000' : '')};
  border-radius: 10px;
`;
