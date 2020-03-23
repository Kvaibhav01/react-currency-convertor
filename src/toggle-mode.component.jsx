import React from 'react';
import { ThemeConsumer } from 'styled-components';

import ThemeButton from './theme-button.component';

export default function ToggleMode() {
  return (
    <ThemeConsumer>
      {theme => (
        <ThemeButton
          variant='primary'
          onClick={e =>
            theme.setTheme(
              theme.mode === 'dark'
                ? { ...theme, mode: 'light' }
                : { ...theme, mode: 'dark' }
            )
          }
        >
          Toggle Mode
        </ThemeButton>
      )}
    </ThemeConsumer>
  );
}
