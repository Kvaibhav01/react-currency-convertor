import React, { useEffect, useState } from 'react';
import './App.css';

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import style from 'styled-theming';

import CurrencyRow from './currency-row.component';
import useTheme from './useTheme';
import ToggleMode from './toggle-mode.component';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  // This is run 2nd time to get all the currency options with keys
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);

  const theme = useTheme();

  // To check whether the amount is in to or from box
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    // The 'amount' in state is 'fromAmount'
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    // 'amount' is in 'toCurrency'
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  // This will only run the first time our app loads
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        // Get the first currency
        const firstCurrency = Object.keys(data.rates)[0];
        setcurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        // Actual rate of currency
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  const getBackground = style('mode', {
    light: '#eee',
    dark: '#111'
  });

  const getForeground = style('mode', {
    light: '#111',
    dark: '#eee'
  });

  const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${getBackground};
      color: ${getForeground};
    }
`;

  return (
    //? Empty fragment allows us to render more than one tag in 'return'
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className='container'>
          <h1>currency convertor</h1>
          {/* Icon here */}
          <p className='desc'>
            Enter the currency value, pick a type and see the <br /> conversion!
            Or try other way round
            <span role='img' aria-label='smiling emoji'>
              😉
            </span>
          </p>
          <div className='theme-toggle'>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              width='44'
              height='43.8'
              viewBox='0 0 44 43.8'
            >
              <g id='ic_wb_sunny_48px' transform='translate(-2 -1.1)'>
                <path
                  id='Path_1'
                  data-name='Path 1'
                  d='M13.51,9.69,9.93,6.1,7.1,8.93l3.59,3.59,2.82-2.83ZM8,21H2v4H8ZM26,1.1H22V7h4ZM40.9,8.93,38.07,6.1,34.48,9.69l2.83,2.83L40.9,8.93ZM34.49,36.31l3.59,3.59,2.83-2.83-3.59-3.59-2.83,2.83ZM40,21v4h6V21ZM24,11A12,12,0,1,0,36,23,12,12,0,0,0,24,11ZM22,44.9h4V39H22ZM7.1,37.07,9.93,39.9l3.59-3.59-2.83-2.83L7.1,37.07Z'
                  fill='#ff8906'
                />
              </g>
            </svg> */}
            <ToggleMode />
          </div>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={event => setFromCurrency(event.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
          <div className='equals'>equals</div>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={event => setToCurrency(event.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
          <p>
            Made with React by Vaibhav Khulbe. Data sourced from&nbsp;
            <a href='https://exchangeratesapi.io/' target='blank'>
              exchangeratesapi.io
            </a>
            .
          </p>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
