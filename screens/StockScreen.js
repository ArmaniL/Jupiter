import  React,{ useState,useEffect,Component } from 'react';
import { TextInput,View,Animated,ActivityIndicator,TouchableOpacity,Text} from 'react-native';
import {SafeAreaView,SafeAreaProvider} from 'react-native-safe-area-context';
import * as Font from 'expo-font'
import Symbols from '../constants/Symbols'
import { FlatList } from 'react-native-gesture-handler'; 
import  styles from '../constants/Stockstyles'
import Util from '../Util'
import ArticlePreview from "../components/ArticlePreview"


 async function getStocks(symbol){

  let url="https://river-karma-280122.uc.r.appspot.com/Stock/Quote?SYM="
  url=url.concat(symbol["Symbol"])
 // console.log("URL IS")
  //console.log(url)
  Util.sleep(20000).then(fetch(url).then(
      
      (response)=>{
         // console.log("Response is ")
          return(response.json())
      }
      
      ).then((data)=>{
          //console.log(data)
          
          symbol["High"]=parseFloat(data["high"][0]).toFixed(2).toString()
          symbol["Close"]=parseFloat(data["close"][0]).toFixed(2).toString()
          symbol["Low"]=parseFloat(data["low"][0]).toFixed(2).toString()
          symbol["Open"]=parseFloat(data["open"][0]).toFixed(2).toString()
          symbol["Volume"]=parseFloat(data["volume"][0]).toFixed(2).toString()
          
       
          //console.log(data["high"][0])
          //console.log(symbol["High"])
          //console.log(symbol)
         }))
   
}





async function getNews(Symbol){
//get news
let url="https://river-karma-280122.uc.r.appspot.com/News/Headline?q="
url=url.concat(Symbol["Company"])
console.log(url)
Util.sleep(20000).then(fetch(url).then(
      
  (response)=>{
     // console.log("Response is ")
      return(response.json())
  }
  
  ).then((data)=>{
      //console.log(data)
       Symbol["Article"]=data
      //console.log(data["high"][0])
      //console.log(symbol["High"])
      //console.log(symbol)
     }))


}


    


export default class StockScreen extends Component{



constructor(props) {
    super(props)
    this.state = { loading: true,symbols:[],articles:[] }
    this.state.symbols=Util.getRandom(Symbols,20)
  
  }



  


  async componentDidMount(){
  
    await Font.loadAsync({
      'ExtraLight':require('../assets/fonts/Dosis-ExtraLight.ttf'),
      'Light':require('../assets/fonts/Dosis-Light.ttf'),
      'Regular':require('../assets/fonts/Dosis-Regular.ttf'),
      'Bold':require('../assets/fonts/Dosis-Bold.ttf'),
      'Medium':require('../assets/fonts/Dosis-Medium.ttf'),
      'SemiBold':require('../assets/fonts/Dosis-SemiBold.ttf'),
      'ExtraBold': require('../assets/fonts/Dosis-ExtraBold.ttf')   
      
    })
    //this.symbols.forEach(getData)  
    this.state.symbols.forEach(getStocks)
    this.state.symbols.forEach(getNews)
    const Nonull=(symbol)=>{ 
      if(symbol["Open"]){ return true;}
    return false; 
    }
    this.state.symbols=this.state.symbols.filter(Nonull)
    
    for(let i = 0 ; i < this.state.symbols.length; i++) {
    
      if(this.state.symbols[i]["Article"]){
        this.state.articles.push(this.state.symbols[i]["Article"])
      }
    console.log(this.state.articles)  
   }
    
    

      
      
    
    console.log("Example g\n")
    
    //console.log("Symbols is ")
    //console.log(this.state.symbols)
    //console.log(this.state.articles)
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
<Text style={{fontFamily:"Bold",marginTop:10,fontSize:32}}>News</Text>
<View style={styles.SmallCard}>
<FlatList horizontal={true}   data={this.state.articles} renderItem={
({item})=>(  
 <ArticlePreview article={item} />
  
)

}>

</FlatList>
</View>
<Text style={{fontFamily:"Bold",marginTop:10,fontSize:32}}>Quotes</Text>
<View  style={styles.Card}>
  <FlatList
  data={this.state.symbols}
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.SymboleContainer} >
     <View style={styles.CompanyInfo}> 
     <Text  style={styles.CompanyName}>{item["Company"]}</Text>
    <Text style={styles.Symbol} >{"Symbol:".concat(item["Symbol"])}</Text> 
    <Text>{item["Percent"]}</Text>
  </View>
  <View style={styles.StockTable}>
  <View style={{flexDirection:'row'}}>
  <Text style={styles.Info} >{"Open:"}</Text>
  <Text style={styles.Numbers}>{item["Open"]}</Text>
  </View>
  <View style={{flexDirection:'row'}}>
  <Text style={styles.Info}>{"High:"}</Text>
  <Text style={styles.Numbers}>{item["High"]}</Text>
  </View>
  <View style={{flexDirection:'row'}}>
  <Text style={styles.Info}>{"Low:"}</Text>
  <Text style={styles.Numbers}>{item["Low"]}</Text>
  </View>
  <View style={{flexDirection:'row'}}>
  <Text style={styles.Info}>{"Close:"}</Text>
  <Text style={styles.Numbers}>{item["Close"]}</Text>
  </View>
  <View style={{flexDirection:'row'}}>
  <Text style={styles.Info}>{"Volume:"}</Text>
  <Text style={styles.Numbers}>{item["Volume"]}</Text>
  </View>
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
  
    useEffect(() => {
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


  //<ArticlePreview title={item["Article"]["title"]} author={item.Article.author} imageurl={item.Article.urlToImage} description={item.Article.description} source={item.Article.source.name} ></ArticlePreview>
  