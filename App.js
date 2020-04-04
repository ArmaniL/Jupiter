import React, { useState,useEffect,Component } from 'react';
import { TextInput,StyleSheet,View,Animated,ActivityIndicator,TouchableOpacity,Text} from 'react-native';
import {SafeAreaView,SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font'
import Symbols from './constants/Symbols'
import { FlatList } from 'react-native-gesture-handler';
function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
 /* 
 function getPrice(symbol){
 
 
  url="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
  url=url.concat(symbol).concat("&apikey=").concat("EC7SWDSB5JFGX7N4")
  console.log(url)
  let v="";
  fetch(url).then(
      
      (response)=>{
          return(response.json())
      }
      
      ).then((data)=>{
          v=data["Global Quote"]["05. price"]
        
         })
   return v      
  
 }

 function getJSON(symbol){

  url="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
  url=url.concat(symbol["Symbol"]).concat("&apikey=").concat("EC7SWDSB5JFGX7N4")
  console.log(url)
  fetch(url).then(
      
      (response)=>{
          return(response.json())
      }
      
      ).then((data)=>{
          symbol["Open"]=data["Global Quote"]["02. open"]
          symbol["High"]=data["Global Quote"]["03. high"]
          symbol["Low"]=data["Global Quote"]["04. low"]
          symbol["Price"]=data["Global Quote"]["05. price"]
          symbol["Volume"]=data["Global Quote"]["06. volume"]
          symbol["Change"]=data["Global Quote"]["09. change"]
          symbol["Percent"]=data["Global Quote"]["10. change percent"]
         })
   
}
*/

function getJSON(symbols){


          var symbol=''
          symbols.forEach( sym=>symbol.concat(sym['Symbol']) )

         const url = new URL(
          "https://api.worldtradingdata.com/api/v1/stock"
      );
      
      let params = {
          "symbol":symbol,
          "api_token": "PD5PAQOvrzMQqp9RSR9OL8BGGJkEpikuiPnIteeDJmUzU9sVmHcqg1vh0O1R",
      };
      Object.keys(params)
          .forEach(key => url.searchParams.append(key, params[key]));
      
      fetch(url, {
          method: "GET",
      })
          .then(response => { 
            
            return response.json()})
          .then(data =>  {
          var n=0  
          for (d in data["data"]){

           
          symbols[n]["Open"]=d["price_open"]
          symbols[n]["High"]=d["day_low"]
          symbols[n]["Low"]=d["day_high"]
          symbols[n]["Price"]=d["price"]
          symbols[n]["Volume"]=d["volume"]
          symbols[n]["Change"]=d["day_change"]
          symbols[n]["Percent"]=d["change_pct"]
          n+=1
        }}
        );


}


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.symbols=getRandom(Symbols,5)
  }



  async componentDidMount(){
    await Font.loadAsync({
      'Regular':require('./assets/fonts/BalooThambi2-Regular.ttf'),
      'Bold':require('./assets/fonts/BalooThambi2-Regular.ttf'),
      'Medium':require('./assets/fonts/BalooThambi2-Medium.ttf'),
      'SemiBold':require('./assets/fonts/BalooThambi2-Regular.ttf'),
      'ExtraBold': require('./assets/fonts/BalooThambi2-ExtraBold.ttf')   
      
    })
    getJSON(this.symbols)
    console.log(this.symbols)
    this.setState({ loading: false });
}

    render(){
if (this.state.loading){
  return(<ActivityIndicator size="large" color="#3ADF00"  style={ {  flex:1 }} ></ActivityIndicator>)
}
else{
return(
<SafeAreaProvider>

<SafeAreaView style={styles.container}>      
<FadeInView style={styles.StatusBar}>      
<TextInput
 style={styles.Input}
 placeholder="Quote Lookup"
 />
</FadeInView>
<View  style={styles.Card}>
  <FlatList
  data={this.symbols}
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.SymboleContainer} >
     <View style={styles.CompanyInfo}> 
     <Text  style={styles.CompanyName}>{item["Company"]}</Text>
    <Text style={styles.Symbol} >{"Symbol:".concat(item["Symbol"])}</Text> 
    <Text>{item["Percent"]}</Text>
  </View>
  <Text style={styles.Price}>{item["Price"]}</Text>
  <View style={styles.StockTable}>
  <Text>{"Open:".concat(item["Open"])}</Text>
  <Text>{"High:".concat(item["High"])}</Text>
  <Text>{"Low:".concat(item["Low"])}</Text>
  <Text>{"High:".concat(item["High"])}</Text>
  <Text>{"Volume:".concat(item["Volume"])}</Text>
  <Text>{"Change:".concat(item["Change"])}</Text>
  </View>
  </TouchableOpacity>
)}
  />
</View>
</SafeAreaView>
</SafeAreaProvider>
);
}

}

}

const styles=StyleSheet.create({
    SymboleContainer:{
      paddingLeft:10,
      flexDirection:'row',
      borderColor:'#40FF00',
      borderWidth:2,
      borderRadius:8,
      backgroundColor:'rgb(255,255,255)',
      marginTop:5,
      justifyContent:'space-between',
      borderTopColor:'rgb(202, 213, 200)',
      borderBottomColor:'rgb(202, 213, 200)',
      borderLeftColor:'rgb(237, 249, 235)',
      borderRightColor:'rgb(237, 249, 235)',
      paddingTop:10

    },
    
    CompanyName:{
    
    
    
    color:'rgb(37, 49, 37  )',
    fontSize:32,
    fontFamily:'ExtraBold'
    },
    StockTable:{
    flexDirection:'column'
    }
    ,
    Symbol:{
      fontFamily:'Medium',
    color:'rgb(187, 196, 185 )',
    fontStyle:'italic'
    }
    ,
    CompanyInfo:{
      flexDirection:"column"
    }
    ,
    container: {
      flex: 1,
      backgroundColor:'rgb(126, 233, 111 )'
    }
    ,

   Card:{
   flexDirection:"column",
   flex:15,
   backgroundColor:'rgb(237, 249, 235)',
   borderRadius:20,
   marginTop:20,
   marginLeft:5,
   marginRight:5,
   paddingTop:5,
   paddingLeft:5,
   paddingRight:5,
   paddingBottom:5




   },

   Price:{
    paddingTop:10,
    fontSize:25,
    fontFamily:'SemiBold',
    paddingRight:15
    

   },
    Input:{
        backgroundColor:'rgb(137, 255, 120)',
        borderRadius:7,
        borderWidth:2,
        fontSize:32,
        fontFamily:'Regular',
        flex:1,
        borderColor:'rgb(137, 255, 120)',
        borderRadius:20,
        marginLeft:10,
        shadowOffset:{
          width:5,
          height:5
        }
        
    },

    StatusBar:{
marginTop:10,      
backgroundColor:'rgb(137, 255, 120)',
flexDirection:"row",
flex:1,
borderRadius:20,
marginLeft:10,
marginRight:10


    }
})

const FadeInView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
    }, [])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
