import React from 'react';
import { ThemeConsumer } from 'styled-components';

import ThemeButton from './theme-button.component';

export default function ToggleMode() {
  return (
    <ThemeConsumer>
      {theme => (
        <ThemeButton
          variant='dark'
          onClick={e =>
            theme.setTheme(
              theme.mode === 'dark'
                ? { ...theme, mode: 'light' }
                : { ...theme, mode: 'dark' }
            )
          }
        >
          <span
            className='emojie-switcher'
            role='img'
            aria-label='Dark/Light mode button'
            alt='toggle theme'
            title='Toggle theme'
          >
            🌓
          </span>
        </ThemeButton>
      )}
    </ThemeConsumer>
  );
}
