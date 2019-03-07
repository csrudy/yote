import React from 'react';

const CurrentCoin = (props) => {
    const { data, currentCoinIndex } = props;
    const { name, symbol, quote } = data[currentCoinIndex];
    const price = quote.USD.price;
    const percent24h = quote.USD.percent_change_24h;
    const percent1h = quote.USD.percent_change_1h;
    const percent7d = quote.USD.percent_change_7d;

    return (
        <div>
            <p>{name} {symbol} {price}</p>
            <input type="text" placeholder="how much?" value={props.quantity} onChange={(e)=>props.updateQuantity(e.target.value)}></input>
            <button onClick={()=>props.hodl()}>HODL</button>
        </div>
    );
}

export default CurrentCoin;