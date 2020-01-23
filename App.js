import React, { Component, Fragment } from 'react';
import 'react-native-gesture-handler';
import { StatusBar, View } from 'react-native';
import { Bubbles } from 'react-native-loader';
import Navigation from './src/components/navigation/Navigation';
import * as Quotes from './src/services/Quotes';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			quotes: []
		};
	}

	async _getAll() {
		await Quotes.getAll();
	}

	componentDidMount() {
		this._getAll()
		setTimeout(() => {
			this.setState({
				loading: false,
			})
		}, 4000)
	}

	render() {
		console.log(this.state.loading)
		if (this.state.loading) {
			return (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffbe76" }}>
					<Bubbles size={20} color="#eb4d4b" />
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
