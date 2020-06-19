import { Image} from 'react-native'
import {Component} from 'react'


import { NavigationActions } from '@react-navigation/native';
export default class LogoScreen extends Component{



    componentDidMount(){
        setTimeOut( () => {
            NavigationActions.navigate('Home');
        }, 5000 );
    }

render(){
<Image source={require("../assets/images/Universe.svg")}></Image>
}




}
