import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        alignItems: "center",
        justifyContent: "center"
    }
});


class Countdown extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.state = {
            nbr: 3
        }
    }

    componentDidMount() {
        const { nbr } = this.state;
        Animated.sequence([
            Animated.timing(this.animatedValue, {
                toValue: 3,
                duration: 1000
            }),
            Animated.timing(this.animatedValue, {
                toValue: 2,
                duration: 1000
            }),
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 1000
            })
        ]).start(() => {
            if (nbr > 0){
                this.setState({
                    nbr : nbr - 1
                })
            }
        })
    }

    render() {
        const interpolationRotation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        })

        const animatedStyle = {
            transform: [
                { rotate: interpolationRotation }
            ]
        }

        const { nbr } = this.state;
        return (
            <View style={style.container}>
                <Animated.View style={[style.box, animatedStyle]}>
                    <Text> {nbr} </Text>
                </Animated.View>
            </View>
        )
    }
}

export default Countdown;