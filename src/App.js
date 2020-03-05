import React, { useEffect, useState } from 'react';
import './App.css';

import CurrencyRow from './currency-row.component';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  // This is run 2nd time to get all the currency options with keys
  const [currencyOptions, setcurrencyOptions] = useState([]);

  // This will only run the first time our app loads
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setcurrencyOptions([data.base, ...Object.keys(data.rates)]);
      });
  }, []);

  return (
    //? Empty fragment allows us to render more than one tag in 'return'
    <>
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} />
      <div className='equals'>=</div>
      <CurrencyRow currencyOptions={currencyOptions} />
    </>
  );
}

export default App;
