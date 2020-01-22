/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import Navigation from './src/components/navigation/Navigation';

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<Navigation />
		</>
	);
};

export default App;
