import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity ,View } from 'react-native';
import { Body, Card, CardItem, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import Images from '../../constants/Images';
import * as Quotes from '../../services/Quotes';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffbe76",
    },
    content1: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    content2: {
        flex: 1,
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

const Home = () =>
    <ImageBackground source={Images.background.home2} style={style.container}>
        <View style={style.content1}>
            <Text style={{fontSize : 30, fontWeight : "bold", textShadowColor : "white"}}> Welcome to </Text>
            <Text style={{fontSize : 40, fontWeight : "bold", textShadowColor : "white"}}> Quote Master ! </Text>
            <Text> {Quotes.getRandom()._id} </Text>
        </View>
        <View style={style.content2}>
            <TouchableOpacity style={style.card1}>
                <Card style={{ alignItems: "center" }}>
                    <CardItem header bordered>
                        <Icon name="search" size={80} />
                    </CardItem>
                    <CardItem>
                        <Body style={{ alignItems: "center" }}>
                            <Text style={{fontStyle : "italic"}}> Quiz </Text>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity style={style.card2}>
                <Card style={{ alignItems: "center" }}>
                    <CardItem header bordered>
                        <Icon name="puzzle-piece" size={80} />
                    </CardItem>
                    <CardItem>
                        <Body style={{ alignItems: "center" }}>
                            <Text style={{fontStyle : "italic"}}> Requotepose </Text>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={style.content3}>
            <Card style={{ alignItems: "center" }}>
                <CardItem header bordered>
                    <Icon name="question" size={80} />
                </CardItem>
                <CardItem>
                    <Body style={{ alignItems: "center" }}>
                        <Text style={{fontStyle : "italic"}}> True or False ? </Text>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    </ImageBackground>

export default Home;