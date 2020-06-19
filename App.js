import  { Component } from 'react';
import { createStackNavigator, createAppContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import StockScreen from './screens/StockScreen'
import LogoScreen from './screens/LogoScreen'

export default class App extends Component{
  render() {
    return <AppContainer />;
  }

}

const AppNavigator = createStackNavigator({
  Logo: {
    screen: LogoScreen
  },
  Home: {
    screen: StockScreen
  }},{
    initialRouteName: "Logo"
}
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});