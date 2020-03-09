import React, { useEffect, useState } from 'react';
import './App.css';

import CurrencyRow from './currency-row.component';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  // This is run 2nd time to get all the currency options with keys
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);

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

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    //? Empty fragment allows us to render more than one tag in 'return'
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={event => setFromCurrency(event.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className='equals'>=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={event => setToCurrency(event.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;
