import React from 'react';

const CoinListRow = (props) => {
    return (
        <div onClick={(e)=>props.onCoinClicked(props.index)}>
            <p>{props.cmc_rank}</p>
            <p>{props.name}</p>
            <p>{props.quote.USD.price}</p>
            <p>{props.quote.USD.market_cap}</p>
            <p>{props.quote.USD.percent_change_24h}</p>
        </div>
    );
}


export default CoinListRow;