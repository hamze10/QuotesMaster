/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView, ScrollView, Text, View, StatusBar } from 'react-native';

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<ScrollView contentInsetAdjustmentBehavior="automatic">
					<View>
						<Text> Hello World !</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default App;
