import React from 'react';

export default function CurrencyRow(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency, amount } = props;
  return (
    <div>
      <input type='number' className='input' value={amount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
