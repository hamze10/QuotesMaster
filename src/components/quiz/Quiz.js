import React, { Component } from 'react';
import { BackHandler, Button ,StyleSheet, View, Text } from 'react-native';

import CountdownCircle from 'react-native-countdown-circle';

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startGame: false
        }
    }

    componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    handleBackButtonPressAndroid = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }
        return true;
    }

    _startGame() {
        this.setState({
            startGame: true
        })
    }

    _goHome(){
        this.props.navigation.goBack();
    }

    render() {
        const { startGame } = this.state
        if (!startGame) {
            return (
                <View style={style.container}>
                    <CountdownCircle
                        seconds={3}
                        radius={150}
                        borderWidth={30}
                        color="#ffbe76"
                        bgColor="#ecf0f1"
                        textStyle={{ fontSize: 70 }}
                        onTimeElapsed={() => this._startGame()}
                    />
                </View>
            )
        }

        return (
            <View style={style.container}>
                <Text> Quiz GO ! </Text>
                <Button title="Go Back" onPress={ () => this._goHome() } />
            </View>
        )

    }
}

export default Quiz;