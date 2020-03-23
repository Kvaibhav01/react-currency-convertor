import styled from 'styled-components';
import style from 'styled-theming';

const getBackground = style.variants('mode', 'variant', {
  normal: {
    light: '#eee',
    dark: '#111'
  },

  primary: {
    light: 'papayawhip',
    dark: 'pink'
  }
});

const ThemeButton = styled.button`
  background-color: ${getBackground};
`;

export default ThemeButton;
