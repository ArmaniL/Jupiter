import { render } from "react-dom";
import { View,Text } from "react-native";
import React,{Component} from "react";
import PropTypes from 'prop-types';


export default class ConstSymbol extends Component{
    //Symbol keeps coming up null
    
    static key= "EC7SWDSB5JFGX7N4"
   
    constructor(props){
    super(props)

}


getData(symbol){
this.symbol=this.props.symbol;
if(!(this.symbol=null)){
url="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
url=url.concat(this.symbol).concat("&apikey=").concat(ConstSymbol.key)
console.log(url)
return(fetch(url).then(
    
    (response)=>{
        return(response.json())
    }
    
    ).then((data)=>{return data["Global Quote"]["05. price"]})



)
} 







}




render(){

    return(
 
     <View style={
         {
             flexDirection:'row',
             bordercolor:'#40FF00',
             borderWidth:3,
             
             
             
         }}>
         
        <Text >{this.getData()}</Text>

     </View>
    );
 }


};