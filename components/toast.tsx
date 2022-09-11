import styled from 'styled-components';
import Font from 'components/font';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { toastAtom } from 'atoms';

type Props = {
  value: string;
};

const Toast = (props: Props) => {
  const [toast, setToast] = useRecoilState(toastAtom);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setToast((prev) => {
        return { ...prev, state: false };
      });
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [toast.state]);

  return (
    <Frame active={toast.state}>
      <Font size={16} color="#fff">
        {props.value}
      </Font>
    </Frame>
  );
};

export default Toast;

const Frame = styled.div<{ active: boolean }>`
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 12rem;
  left: 0;
  right: 0;
  width: max-content;
  padding: 1rem 2rem;
  margin: 0 auto;

  background-color: #000;
  border-radius: 10px;
  z-index: 10;
`;
