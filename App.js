import React, { Component, Fragment } from 'react';
import 'react-native-gesture-handler';
import { StatusBar, View } from 'react-native';
import { Bubbles } from 'react-native-loader';
import Netinfo from '@react-native-community/netinfo';
import { Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Navigation from './src/components/navigation/Navigation';
import * as Quotes from './src/services/Quotes';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			contentLoaded : false,
			internet : true,
		};
	}

	async _getAll() {
		await Quotes.getAll();
	}

	async _checkInternet() {
		await Netinfo.fetch()
		.then(state => {
			this.setState({
				internet : state.isConnected
			})
		})
	}

	async componentDidMount() {
		this._checkInternet();
		if (!this.state.internet) return;
		await this._getAll();
		this.setState({
			loading: false,
			contentLoaded : true,
		})
	}

	async componentDidUpdate(){
		const {internet, contentLoaded} = this.state;
		if (internet && !contentLoaded){
			await this._getAll();
			this.setState({
				loading: false,
				contentLoaded : true,
			})
		}
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffbe76" }}>
					<Bubbles size={20} color="#eb4d4b" />
					{!this.state.internet && 
						<View style={{marginTop:20, alignItems : "center"}}>
							<Text style={{fontSize : 20, textAlign : "center"}}> An internet connection is required ! </Text>
							<Button onPress={ () => { this._checkInternet() }} iconRight danger style={{width : 120, justifyContent : "center", marginTop : 10}}>
								<Text> Reload </Text>
								<Icon name="reload" color="white" size={20} style={{marginRight:10}} />
							</Button>
						</View>
					}
				</View>
			)
		}
		return (
			<Fragment>
				<StatusBar barStyle="dark-content" />
				<Navigation />
			</Fragment>
		)
	}
}

export default App;
