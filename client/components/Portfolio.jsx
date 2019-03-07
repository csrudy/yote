import React from 'react';
import CoinList from './CoinList.jsx';
import CurrentCoin from './CurrentCoin.jsx';
import Wallet from './Wallet.jsx';

export default class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentCoin = this.setCurrentCoin.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.hodl = this.hodl.bind(this);

        this.state = {
            coinData: [],
            currentCoinIndex: 0,
            quantity: '',
            walletInfo: this.getWalletInfo() || {}
        };
    }

    setCurrentCoin(index) {
        this.setState({ currentCoinIndex: index })
    }

    updateQuantity(value) {
        this.setState({ quantity: value })
    }

    getWalletInfo() {
        const { userId } = this.props
        fetch(`http://localhost:3000/api/v1/wallet?userid=${userId}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({ walletInfo: data })
            }).catch(err => console.log(err))
    }


    hodl() {
        const { userId } = this.props
        const { symbol } = this.state.coinData[this.state.currentCoinIndex]
        const obj = { type: 'buy', coin: symbol, quantity: Number(this.state.quantity), user_id: userId }
        console.log(obj);
        fetch('http://localhost:3000/trades', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            }
        })  
        .then(res => res.json())
            .then(response => {
                
                    this.getWalletInfo();
                
            }).catch(err => console.log(err))
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/historicals')
            .then(response => response.json())
            .then(({ data }) => this.setState({
                coinData: data,
            }))
    }

    render() {

        if (this.state.coinData.length === 0) {
            return <div>Loading</div>
        }

        const { userId } = this.props;
        const { coinData, currentCoinIndex, quantity, walletInfo } = this.state;
        console.log(coinData, currentCoinIndex, quantity)
        return <div>
            THIS IS YOUR SECRET KEY: {userId} <br />
            Current Coin: {currentCoinIndex}
            <Wallet walletInfo={walletInfo} data={coinData}></Wallet>
            <CurrentCoin data={coinData} hodl={this.hodl} quantity={quantity} currentCoinIndex={currentCoinIndex} updateQuantity={this.updateQuantity}></CurrentCoin>
            <CoinList key={currentCoinIndex} data={coinData} onCoinClicked={this.setCurrentCoin}></CoinList>
        </div>;
    }
}