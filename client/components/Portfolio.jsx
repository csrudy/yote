import React from 'react';
import CoinList from './CoinList.jsx'

export default class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentCoin = this.setCurrentCoin.bind(this);
        this.state = {
            coinData: [],
            currentCoinIndex: 0
        };
    }

    setCurrentCoin(index) {
        this.setState({ currentCoinIndex: index })
    }

    // POST /trades
    // fetch()
    //   .then((response) => {
    //     if (response.ok) {
    //       // rerequest wallet endpoint
    //     }
    //    })
    //   .catch()

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/historicals')
        .then(response => response.json())
        .then(({ data }) => this.setState({
            coinData: data,
        }))
    }

    render() {
        const { userId } = this.props;
        const { coinData, currentCoinIndex } = this.state;
        return <div>
           THIS IS YOUR SECRET KEY: {userId} <br/>
           Current Coin: {currentCoinIndex}
           <CoinList data={coinData} onCoinClicked={this.setCurrentCoin}></CoinList>
        </div>;
    }
}