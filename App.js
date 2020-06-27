import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import StockScreen from './screens/StockScreen'
import { NavigationContainer } from '@react-navigation/native'
export default class App extends Component{
  render() {
    return <StockScreen />;
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name='Home' component={StockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}