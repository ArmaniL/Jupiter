import {StyleSheet} from 'react-native'
const styles=StyleSheet.create({

    NewsInfo:{
      flexDirection:"column",
    
    },
    
    
      
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
          paddingTop:30,
          paddingBottom:30
          
    
        },
        
        CompanyName:{
        
        
        
        color:'rgb(37, 49, 37  )',
        fontSize:32,
        fontFamily:'ExtraLight'
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

        },
        Info:{
          fontFamily:'SemiBold'
        }
        ,
        Numbers:{
          fontFamily:'Medium'
        }
        ,
        container: {
          flex: 1,
          backgroundColor:'rgb(126, 233, 111 )'
        }
        ,
    
       Card:{
       flexDirection:"column",
       flex:10,
       backgroundColor:'rgb(237, 249, 235)',
       borderRadius:20,
       marginTop:0,
       marginLeft:5,
       marginRight:5,
       paddingTop:5,
       paddingLeft:5,
       paddingRight:5,
       paddingBottom:5
    
    
    
    
       },
       
       SmallCard:{
         flex:5.5,
         backgroundColor:'rgb(237, 249, 235)'
       }
       ,
    
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
    
    export default styles