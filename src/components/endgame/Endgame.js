import React, { Component } from 'react';
import { BackHandler, View, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base';

const style = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    loose : {
        fontSize : 30,
        color : "red"
    }
})

class Endgame extends Component {
    constructor(props) {
        super(props);
        //this.handleBackButtonPressAndroid = this.handleBackButtonPressAndroid.bind(this);
        //this._goHome = this._goHome.bind(this);
    }

    handleBackButtonPressAndroid = () => {
        return this.props.navigation.isFocused();
    }

    _goHome() {
        this.props.navigation.navigate("TabNavigator");
    }

    componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    render() {
        let { navigation } = this.props;
        return (
            <View style={style.container}>
                <Text style={style.loose}> YOU LOOSE ! </Text>
                <Text> Your score : {JSON.stringify(navigation.getParam('score', '0'))}</Text>
                <Button iconLeft onPress={ () => this._goHome()}>
                    <Icon name='home' style={{color : "white"}} />
                    <Text>Home</Text>
                </Button>
            </View>
        )
    }
}

export default Endgame;