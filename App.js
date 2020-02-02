import React, { Component, Fragment } from 'react';
import 'react-native-gesture-handler';
import { StatusBar, View } from 'react-native';
import { Bubbles } from 'react-native-loader';
import Netinfo from '@react-native-community/netinfo';
import { Body, Button, Card, CardItem, Text, H3, H1, Root } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Navigation from './src/components/navigation/Navigation';
import * as Quotes from './src/services/Quotes';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			contentLoaded: false,
			internet: true,
		};
	}

	async _getAll() {
		await Quotes.getAll();
	}

	async _checkInternet() {
		await Netinfo.fetch()
			.then(state => {
				this.setState({
					internet: state.isConnected
				})
			})
	}

	async componentDidMount() {
		await this._checkInternet();
		if (!this.state.internet) return;
		await this._getAll();
		this.setState({
			loading: false,
			contentLoaded: true,
		})
	}

	async componentDidUpdate() {
		const { internet, contentLoaded } = this.state;
		if (internet && !contentLoaded) {
			await this._getAll();
			this.setState({
				loading: false,
				contentLoaded: true,
			})
		}
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffbe76" }}>
					{!!this.state.internet &&
						<Bubbles size={20} color="#eb4d4b" />
					}
					{!this.state.internet &&
						<Card style={{ width: "90%", height: "50%", justifyContent: "center" }}>
							<CardItem header bordered style={{ justifyContent: "center" }}>
								<Text style={{ color: "#eb4d4b", fontWeight: "bold", fontSize: 60 }}> Ooops ...</Text>
							</CardItem>
							<CardItem style={{ flexDirection: "column" }}>
								<Text style={{ fontSize: 13 }}> Slow or no internet connection. </Text>
								<Text style={{ fontSize: 13 }}> Please, check your internet settings. </Text>
								<Button onPress={() => { this._checkInternet() }} iconRight danger style={{ justifyContent: "center", marginTop: 20 }}>
									<Text> Reload </Text>
									<Icon name="reload" color="white" size={20} style={{ marginRight: 10 }} />
								</Button>
							</CardItem>
						</Card>
					}
				</View>
			)
		}
		return (
			<Root>
				<Fragment>
					<StatusBar hidden={true} />
					<Navigation />
				</Fragment>
			</Root>
		)
	}
}

export default App;
