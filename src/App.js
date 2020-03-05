import React from 'react';
import './App.css';

import CurrencyRow from './currency-row.component';

function App() {
  return (
    //? Empty fragment allows us to render more than one tag in 'return'
    <>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className='equals'>=</div>
      <CurrencyRow />
    </>
  );
}

export default App;
