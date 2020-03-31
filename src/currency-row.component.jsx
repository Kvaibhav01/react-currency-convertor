import React from 'react';

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props;

  return (
    <>
      <div className='inputContainer'>
        <div className='inputFrom'>
          <p className='inputLabel'>Enter currency</p>
          <input
            type='number'
            className='input'
            value={amount}
            onChange={onChangeAmount}
          />
        </div>

        <div className='inputTo'>
          <p className='inputLabel'>Pick currency</p>
          <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
