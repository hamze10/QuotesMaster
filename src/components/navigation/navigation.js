import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from '../home/Home';
import Leaderboard from '../leaderboard/Leaderboard';
import Quiz from '../quiz/Quiz';
import Endgame from '../endgame/Endgame';

const TabNavigator = createMaterialBottomTabNavigator({
    Home : { 
        screen : Home,
        navigationOptions : {
            tabBarIcon : () =>
            {
                return <Icon name="home" size={20} style={{color:"#eb4d4b"}} />
            }
        }
    },
    Leaderboard : { 
        screen : Leaderboard,
        navigationOptions :{
            tabBarIcon : () => 
            {
                return <Icon name="trophy" size={20} style={{color:"#eb4d4b"}} />
            }
        }
    },
},
{
    barStyle : {
        backgroundColor : "white"
    },
    activeColor : "black",
});

const Navigation = createStackNavigator({
    TabNavigator : { 
        screen : TabNavigator,
        navigationOptions : {
            headerShown : false
        }
    },
    Quiz : {
        screen : Quiz,
        navigationOptions : {
            headerShown : false,
            gestureEnabled : false
        }
    },
    Endgame : {
        screen : Endgame,
        navigationOptions : {
            headerShown : false
        }
    }
},
{
    initialRouteName : 'TabNavigator',
})

export default createAppContainer(Navigation);