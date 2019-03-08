import React from 'react';

const CurrentCoin = (props) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
    const { data, currentCoinIndex } = props;
    const { name, symbol, quote } = data[currentCoinIndex];
    const price = quote.USD.price;
    const percent24h = quote.USD.percent_change_24h;
    const percent1h = quote.USD.percent_change_1h;
    const percent7d = quote.USD.percent_change_7d;

    return (
        <div>
            <h2>{name} ({symbol})</h2>
            <p>current price: {formatter.format(price)}</p>
            <p> 1 hour change: {parseFloat(percent1h).toFixed(2)+'%'}</p>
            <p>24 hour change: {parseFloat(percent24h).toFixed(2)+'%'}</p>
            <p>7 day change: {parseFloat(percent7d).toFixed(2)+'%'}</p>
            <input type="text" placeholder="how much?" value={props.quantity} onChange={(e)=>props.updateQuantity(e.target.value)}></input>
            <button onClick={()=>props.hodl()}>HODL</button>
        </div>
    );
}

export default CurrentCoin;