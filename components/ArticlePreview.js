import React from 'react';
import { Text ,View, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';


export default class Article extends React.Component {
  render() {
    
      
    return (
              <View style= {styles.NewsContainer}>
                
              <View style={ {flexDirection:"row"}} >    
              <Image style = {{ flex:4, marginBottom:2,height:100  }} source={{
          uri: this.props.article?.urlToImage
        }}  ></Image>
              <Text style={{marginTop:20, marginLeft:10,fontFamily:"ExtraBold"}} >{this.props.article?.title}</Text>
              </View>
          <Text style={{ marginBottom: 10,marginTop:20,fontFamily:"Light" }}>
            {this.props.article?.author }
          </Text>
            <Text numberOfLines={6} style={{fontFamily:"Regular"}} >{this.props.article?.description}</Text>
           
        
          
          <Text style={{marginTop:3,fontFamily:"ExtraLight"}} >{this.props.article?.source?.id}</Text>
          </View>
         
    );
  }
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  }
  ,
  NewsContainer:{
    borderRadius:8,
    flexDirection:'column',
    borderColor:'#40FF00',
    borderWidth:2,
    borderRadius:8,
    backgroundColor:'rgb(255,255,255)',
    marginTop:5,
    marginright:0,
    width:Dimensions.get('window').width
        
  }
};

/*

          image={{
            uri: this.props.imageurl || defaultImg
          }}
        */