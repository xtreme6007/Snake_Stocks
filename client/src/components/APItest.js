import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Api from '../utils/Api'



class APItest extends Component {
// set state to hold stock info  
    state = {
        gainers: [],
        stock: [],
        RSI:[]


    }
    // use this as the foreach callback 
    eachStock = async (item) => {
       
        let response = await  Api.getRSI(item.ticker).catch(err => console.log(err))
         console.log("this is the response", response)
          
            let recomendation;
            // recomendation algoritham  
             if(response.data[0].rsi < 40 ) {
                recomendation = "Strong Buy"
            } else if (response.data[0].rsi > 80 ) {
                recomendation = "Strong Sell"
            } else if (response.data[0].rsi > 40 && response.data[0].rsi < 70 ) {

                recomendation = "Buy"
            } else if (response.data[0].rsi > 70 && response.data[0].rsi < 80 ) {

                recomendation = "Sell"
            }
            // set stock object
            const stock =  {ticker: item.ticker, RSI: response.data[0].rsi, recomended: recomendation} ;
            const stocks = this.state.stock;
            stocks.push(stock)

                // set stock object to state
              this.setState({
    
                  stock: stocks
              })
            console.log(this.state.stock)
    
        
        
      
        }
     
// Use this to get the RSI for each ticker returned in the gainers call  

    Rsi = async () => {
        // await this.state.gainers.forEach(this.eachStock)
        for(let i=0; i < this.state.gainers.length; i++ ){
            await this.eachStock(this.state.gainers[i]).catch(err => console.log(err))
            if(i === (this.state.gainers.length -1)){
                console.log("Hello", this.state.stock)
                Api.saveStocks(this.state.stock)
            }


        }
       
        
        



    }
// Use this to call and set state of tickers to use in the rsi fucntion  
    Gainers = () => {
        
        Api.getGainers().then(res => {
            console.log("Test", res)
            const sliced = res.data.slice(0,5) 
            
            this.setState(
                {
                    gainers: sliced
                }
            )
            this.Rsi()
        })
        



    }

    Search = (Stock) => {
    Api.getprice(Stock)

    // use this function to get data for your chart 
    .then(res => {} )
    .catch(err => console.log(err))

    }

    render() {

        return (
         
            <Button className="ml-auto mr-auto mt-auto mb-auto" onClick={this.Gainers}>CLick here to test</Button>
         
     
        )
    }
}
export default APItest


