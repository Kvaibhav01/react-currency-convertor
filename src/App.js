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
    light: '#EBEBEB',
    dark: '#222831'
  });

  const getForeground = style('mode', {
    light: '#5D5E60',
    dark: '#A7A9BE'
  });

  const getPrimary = style('mode', {
    light: '#5B3000',
    dark: '#FF8906'
  });

  const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${getBackground};
      color: ${getForeground};
    }

    h1 {
      color: ${getPrimary}
    }

    .inputLabel {
      color: ${getPrimary}
    }

    .input, select {
      background-color: ${getBackground};
      color: ${getForeground};
      border: 1px solid #5D5E60;
    }

    a {
      color: ${getForeground}
    }
`;

  return (
    //? Empty fragment allows us to render more than one tag in 'return'
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className='container'>
          <h1>currency convertor</h1>
          <p className='desc'>
            Enter the currency value, pick a type and see the <br /> conversion!
            Or try other way round
            <span role='img' aria-label='smiling emoji'>
              😉
            </span>
          </p>
          <div className='theme-toggle'>
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
