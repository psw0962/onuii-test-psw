import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type FontProps = {
  /**
   * font size 지정을 위한 필수 값
   */
  size: 36 | 32 | 28 | 26 | 24 | 21 | 18 | 16 | 15 | 14 | 13 | 12 | 11 | 10;

  /**
   * font color 지정을 위한 선택 값 (default #000)
   */
  color?: string;

  /**
   * fontWeight: font weight 지정을 위한 선택 값 (default 400)
   */
  fontWeight?: 400 | 600 | 700;

  /**
   * letterSpacing: letterSpacing 조절이 필요한 경우 선택 값
   */
  letterSpacing?: string;

  /**
   * lineHeight: lineHeight 조절이 필요한 경우 선택 값
   */
  lineHeight?: string;

  /**
   * translateY: translateY 속성을 이용하여 font의 높이를 조절해야 하는 경우
   */
  translateY?: number;

  /**
   * click event
   */
  onClick?: () => void;

  /**
   * disabled
   */
  disabled?: boolean;

  /**
   * pointer: 커서 포인터가 필요한 경우
   */
  pointer?: boolean;

  /**
   * font 정렬
   */
  textAlign?: string;

  /**
   * text decoration: 텍스트 언더라인이 필요한 경우
   */
  textDecoration?: string;

  /**
   * text content
   */
  children?: ReactNode | ReactNode[];

  /**
   * margin 조절이 필요한 경우 ex) 10px 10px 10px 10px
   */
  margin?: string;
};

const Font = styled.p<FontProps>`
  // 기본 속성
  color: ${(props) => (props.color ? props.color : '#000')};
  letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : 0)};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
  text-align: ${(props) => (props.textAlign ? props.textAlign : '')};
  text-decoration: ${(props) => (props.textDecoration ? props.textDecoration : '')};
  margin: ${({ margin }) => margin};
  cursor: ${(props) => (props.pointer ? 'pointer' : '')};
  transform: translateY(
    ${(props) => {
      return props.translateY ? `${props.translateY}px` : '0px';
    }}
  );

  ${(props) => {
    switch (props.size) {
      case 36:
        return css`
          font-size: 3.6rem;
        `;

      case 32:
        return css`
          font-size: 3.2rem;
        `;

      case 28:
        return css`
          font-size: 2.8rem;
        `;

      case 26:
        return css`
          font-size: 2.6rem;
        `;

      case 24:
        return css`
          font-size: 2.4rem;
        `;

      case 21:
        return css`
          font-size: 2.1rem;
        `;

      case 18:
        return css`
          font-size: 1.8rem;
        `;

      case 16:
        return css`
          font-size: 1.6rem;
        `;

      case 15:
        return css`
          font-size: 1.5rem;
        `;

      case 14:
        return css`
          font-size: 1.4rem;
        `;

      case 13:
        return css`
          font-size: 1.3rem;
        `;

      case 12:
        return css`
          font-size: 1.2rem;
        `;

      case 11:
        return css`
          font-size: 1.1rem;
        `;

      case 10:
        return css`
          font-size: 1rem;
        `;
    }
  }};
`;

export default (props: FontProps) => {
  return <Font {...props}>{props.children}</Font>;
};
