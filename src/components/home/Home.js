import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, Card, CardItem, Text, Toast, Header, Left, Button, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignInExample from './SignIn';

import Images from '../../constants/Images';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffbe76",
    },
    content1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    content2: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        marginLeft: 10,
        marginRight: 10,
    },
    card1: {
        flex: 3,
    },
    card2: {
        flex: 3,
    },
    content3: {
        flex: 2,
        alignItems: "stretch",
        marginLeft: 10,
        marginRight: 10,
    },
})

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SignInExample.signInSilently()
            .then( (msg) => {
                console.log("GOod : ", msg);
            })
            .catch( (err) => {
                console.log("Error : ", err);
                SignInExample.signInIntent()
                    .then( (msg) => {
                        console.log("Good 2 : ", msg)
                    })
                    .catch( (err) => {
                        console.log("Err 2 : ", err)
                    })
            })
    }

    render() {
        return (
            <ImageBackground source={Images.background.home2} style={style.container}>
                <Header transparent style={{ justifyContent: "flex-end" }}>
                    <Right>
                        <Button onPress={() => Toast.show({
                            text: "As long as you answer correctly, you continue!", buttonText: "OK", duration: 5000
                        })} rounded style={{ backgroundColor: "#eb4d4b", width: 50, height: 50, justifyContent: "center" }}>
                            <Icon name="info" size={30} style={{ color: "white" }} />
                        </Button>
                    </Right>
                </Header>
                <View style={style.content1}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "white", textShadowColor: "white" }}> Become the new </Text>
                    <Text style={{ fontSize: 40, fontWeight: "bold", color: "#eb4d4b", textShadowColor: "white", fontFamily: "Serenity" }}> Quote Master ! </Text>
                </View>
                <View style={style.content2}>
                    <TouchableOpacity style={style.card1} onPress={() => { this.props.navigation.navigate("Quiz") }}>
                        <Card style={{ alignItems: "center" }}>
                            <CardItem header bordered>
                                <Image source={Images.icons.quiz} style={{ width: 80, height: 80 }} />
                            </CardItem>
                            <CardItem>
                                <Body style={{ alignItems: "center" }}>
                                    <Text style={{ fontStyle: "italic" }}> Quiz </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.card2} onPress={() => Toast.show({ text: "Not available yet !", buttonText: "OK", type: "warning", duration: 2000 })}>
                        <Card style={{ alignItems: "center" }}>
                            <CardItem header bordered>
                                <Icon name="question" size={80} style={{ color: "#eb4d4b" }} />
                            </CardItem>
                            <CardItem>
                                <Body style={{ alignItems: "center" }}>
                                    <Text>
                                        <Text style={{ fontStyle: "italic", textDecorationLine: "line-through", textDecorationStyle: "solid" }}> Requote </Text>
                                        <Text> - SOON</Text>
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={style.content3} onPress={() => Toast.show({ text: "Not available yet !", buttonText: "OK", type: "warning", duration: 2000 })}>
                    <Card style={{ alignItems: "center" }}>
                        <CardItem header bordered>
                            <Icon name="question" size={80} style={{ color: "#eb4d4b" }} />
                        </CardItem>
                        <CardItem>
                            <Body style={{ alignItems: "center" }}>
                                <Text>
                                    <Text style={{ fontStyle: "italic", textDecorationLine: "line-through", textDecorationStyle: "solid" }}> True or False ? </Text>
                                    <Text> - SOON</Text>
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </ImageBackground >
        )
    }
}


export default Home;