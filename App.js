import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import LoginScreen from './src/pages/LoginScreen';
import SeriesPage from './src/pages/SeriesPage';


const AppNavigation = createStackNavigator({
  'Login' : {
    screen: LoginScreen
  },
  'Main' :{
    screen: SeriesPage
  },
},
{
    defaultNavigationOptions: {
      title: "Series!",
      headerTintColor: 'white',
      headerStyle:{
        backgroundColor: '#6ca2f7',
        bordeBottomWidth: 1,
        borderBottomColor: '#C5C5C5',
      },
      headerTitleStyle:{
        color: 'white',
        fontSize: 30,
      }
    }
});

const AppContainer = createAppContainer(AppNavigation);

export default AppContainer;

