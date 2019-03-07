import React from 'react';
import CoinListRow from './CoinListRow.jsx';

// data => Array[CMC stuff]
// onCoinClicked => (index) => void

export default class CoinList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data, onCoinClicked } = this.props;
        const list = data.map((coinData, index) => <CoinListRow key={coinData.name} {...coinData} index={index} onCoinClicked={onCoinClicked}></CoinListRow>)
        return <div>{list}</div>
    }
}