import React from 'react';

const Wallet = (props) => {
    
    const { walletInfo } = props;
    console.log(walletInfo)
    const keys =  Object.keys(walletInfo.totals)
    console.log(keys)
    const holdings = keys.map((coin, index )=> <p key={index}>{coin}: {walletInfo.totals[coin]}</p>)
    return (
        <div>
            <p> Your current holdings: </p>
            {holdings}
        </div>
    )
}

export default Wallet;