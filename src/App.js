import React, { useEffect, useState } from 'react';
import './App.css';

import CurrencyRow from './currency-row.component';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  // This is run 2nd time to get all the currency options with keys
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

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
      });
  }, []);

  return (
    //? Empty fragment allows us to render more than one tag in 'return'
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
      />
      <div className='equals'>=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
      />
    </>
  );
}

export default App;
