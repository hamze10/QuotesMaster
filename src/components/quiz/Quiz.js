import React, { Component } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { Button, Body, Card, CardItem, Container, Header, H3, Icon, Left, Text, Right, Content } from 'native-base';

import CountdownCircle from 'react-native-countdown-circle';
import * as Quotes from '../../services/Quotes';
import { TouchableOpacity } from 'react-native-gesture-handler';

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        backgroundColor: "#ffbe76",
    },
    cardQuestion: {
        fontWeight: "bold"
    },
    cardFooter: {
        fontStyle: "italic",
    },
    cardContainer: {
        flex: 1,
    },
    cardQuote: {
        flex: 3,
        justifyContent: "center",
        margin: 5
    },
    cardContainer2: {
        flex: 3,
        flexDirection: "row",
        margin: 5,
    },
    cardQuote2: {
        flex: 3,
    },
    cardQuote3: {
        flex: 3,
    },
    cardResp: {
        height: 100,
        justifyContent: "center"
    }
})

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startGame: false,
            score: 0,
            seconds: 6,
            quote: "",
            oldQuotes: [],
            authors: [],
            color: "white",
            finish: false
        }
        this.handleBackButtonPressAndroid = this.handleBackButtonPressAndroid.bind(this);
        this._startGame = this._startGame.bind(this);
        this._finish = this._finish.bind(this);
        this._goHome = this._goHome.bind(this);
        this._checkResp = this._checkResp.bind(this);
    }

    //Disable back button when quiz start
    handleBackButtonPressAndroid = () => {
        return this.props.navigation.isFocused();
    }

    _startGame() {
        this.setState({
            startGame: true
        })
    }

    _finish() {
        let { score } = this.state;
        this.props.navigation.navigate('Endgame', {
            score: score
        })
    }

    _goHome() {
        this.props.navigation.goBack();
    }

    _checkResp(resp) {
        let { score, oldQuotes, quote } = this.state;
        let bool = resp === quote.author;
        if (bool) {
            let nextQuote = Quotes.getRandom();
            let authors = Quotes.getThreeRandomAuthor(nextQuote.author);
            while (oldQuotes.indexOf(nextQuote) >= 0) {
                nextQuote = Quotes.getRandom();
                authors = Quotes.getThreeRandomAuthor(nextQuote.author);
            }
            this.setState({
                score: score + 1,
                quote: nextQuote,
                oldQuotes: oldQuotes.concat(nextQuote),
                authors: authors,
                color: "white",
                finish: false
            })
        } else {
            this.props.navigation.navigate('Endgame', {
                score: score
            })
        }
    }

    componentDidMount() {
        let quote = Quotes.getRandom();
        let authors = Quotes.getThreeRandomAuthor(quote.author);
        this.setState({
            quote: quote,
            oldQuotes: this.state.oldQuotes.concat(quote),
            authors: authors
        })
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    render() {
        const { authors, color, quote, startGame, score, seconds } = this.state
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
            <Container>
                <Header style={style.header}>
                    <Left>
                        <Button transparent onPress={() => this._goHome()}>
                            <Icon name='arrow-back' style={{ color: "black" }} />
                        </Button>
                    </Left>
                    <Left>
                        <Text> Score : {score} </Text>
                    </Left>
                    <Right>
                        <CountdownCircle
                            seconds={seconds}
                            radius={20}
                            borderWidth={5}
                            color="#eb4d4b"
                            bgColor="#ecf0f1"
                            textStyle={{ fontSize: 10 }}
                            onTimeElapsed={() => this._finish()}
                        />
                    </Right>
                </Header>
                <View style={style.cardContainer}>
                    <View style={style.cardQuote}>
                        <Card style={{ padding: 20, backgroundColor: color }}>
                            <CardItem>
                                <Body>
                                    <Text style={style.cardQuestion}>
                                        "{quote.content}"
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem footer style={{ justifyContent: "center" }}>
                                <Text style={style.cardFooter}> - ??? </Text>
                            </CardItem>
                        </Card>
                    </View>
                    <View style={style.cardContainer2}>
                        <View style={style.cardQuote2}>
                            <TouchableOpacity onPress={() => this._checkResp(authors[0])}>
                                <Card style={style.cardResp}>
                                    <CardItem>
                                        <Body>
                                            <Text> {authors[0]} </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._checkResp(authors[1])}>
                                <Card style={style.cardResp}>
                                    <CardItem>
                                        <Body>
                                            <Text> {authors[1]}  </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </View>
                        <View style={style.cardQuote3}>
                            <TouchableOpacity onPress={() => this._checkResp(authors[2])}>
                                <Card style={style.cardResp}>
                                    <CardItem>
                                        <Body>
                                            <Text> {authors[2]}  </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._checkResp(authors[3])}>
                                <Card style={style.cardResp}>
                                    <CardItem>
                                        <Body>
                                            <Text> {authors[3]}  </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Container>
        )

    }
}

export default Quiz;