import React from 'react';
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
const CoinListRow = (props) => {
    return (
        <div className="coinRow" onClick={(e)=>props.onCoinClicked(props.index)}>
            <p> Rank by marketcap: {props.cmc_rank}</p>
            <p>{props.name}</p>
            <p>Current price: {formatter.format(props.quote.USD.price)}</p>
            <p>Marketcap: {formatter.format(props.quote.USD.market_cap)}</p>
            <p>24hr change {parseFloat(props.quote.USD.percent_change_24h).toFixed(2)+'%'}</p>
        </div>
    );
}


export default CoinListRow;