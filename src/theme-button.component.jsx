import styled from 'styled-components';
import style from 'styled-theming';

const getBackground = style.variants('mode', 'variant', {
  dark: {
    light: '#EBEBEB',
    dark: '#222831'
  }
});

const ThemeButton = styled.button`
  background-color: ${getBackground};
  border: none;
  padding: 10px;
  border-radius: 50%;
  float: right;
  margin-top: -8rem;
  margin-right: -10rem;
`;

export default ThemeButton;
