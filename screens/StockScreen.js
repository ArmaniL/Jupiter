import  { useState,useEffect,Component } from 'react';
import { TextInput,View,Animated,ActivityIndicator,TouchableOpacity,Text} from 'react-native';
import {SafeAreaView,SafeAreaProvider} from 'react-native-safe-area-context';
import * as Font from 'expo-font'
import Symbols from '../constants/Symbols'
import { FlatList } from 'react-native-gesture-handler'; 
import  styles from '../constants/Stockstyles'
import Util from '../Util'


var symbols;
 

async function getData(symbol){
  getNews(symbol)
getStocks(symbol)

}


 async function getStocks(symbol){

  let url="https://river-karma-280122.uc.r.appspot.com/?SYM="
  url=url.concat(symbol["Symbol"])
  console.log("URL IS")
  console.log(url)
  fetch(url).then(
      
      (response)=>{
          console.log("Response is ")
          return(response.json())
      }
      
      ).then((data)=>{
          console.log(data)
          symbol["High"]=data["high"][0]
          symbol["Close"]=data["close"][0]
          symbol["Low"]=data["low"][0]
          symbol["Open"]=data["open"][0]
          symbol["Volume"]=data["volume"][0]
          console.log(data["high"][0])
          console.log(symbol["High"])
          console.log(symbol)
         })
   
}





async function getNews(Symbol){
//get news
url="http://newsapi.org/v2/top-headlines?"
url=url.concat("q=").concat(Symbol["Company"])
url=url.concat("&apiKey=879248ecbcc04ce1a9bf0fef399076ff")
console.log(url)
fetch(url).then(
      
  (response)=>{
      
      return(response.json())
  }
  
  ).then((data)=>{
    
     this.articles=this.articles.concat( data["articles"])
     //console.log("\n")
     //console.log(articles)
     })
      
    }


export default class StockScreen extends Component{



constructor(props) {
    super(props);
    this.state = { loading: true };
    symbols=Util.getRandom(Symbols,10)
    this.articles=[]
  }



  async componentDidMount(){
  
    await Font.loadAsync({
      'Regular':require('../assets/fonts/BalooThambi2-Regular.ttf'),
      'Bold':require('../assets/fonts/BalooThambi2-Regular.ttf'),
      'Medium':require('../assets/fonts/BalooThambi2-Medium.ttf'),
      'SemiBold':require('../assets/fonts/BalooThambi2-Regular.ttf'),
      'ExtraBold': require('../assets/fonts/BalooThambi2-ExtraBold.ttf')   
      
    })
    //this.symbols.forEach(getData)  
    symbols.forEach(getStocks)
    console.log("Symbols is ")
    console.log(symbols)
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
<View style={styles.SmallCard}>
<FlatList horizontal={true}  data={this.articles} renderItem={
({item})=>(
  <TouchableOpacity style={styles.NewsContainer} >
  <View style={styles.NewsInfo}>
  <Text>
    {item["title"]}
  </Text>
  <Text>
    {item["description"]}
  </Text>
  </View>
  </TouchableOpacity>
)

}>

</FlatList>
</View>
<View  style={styles.Card}>
  <FlatList
  data={symbols}
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.SymboleContainer} >
     <View style={styles.CompanyInfo}> 
     <Text  style={styles.CompanyName}>{item["Company"]}</Text>
    <Text style={styles.Symbol} >{"Symbol:".concat(item["Symbol"])}</Text> 
    <Text>{item["Percent"]}</Text>
  </View>
  <View style={styles.StockTable}>
  <Text>{"Open:".concat(item["Open"])}</Text>
  <Text>{"High:".concat(item["High"])}</Text>
  <Text>{"Low:".concat(item["Low"])}</Text>
  <Text>{"High:".concat(item["High"])}</Text>
  <Text>{"Volume:".concat(item["Volume"])}</Text>
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