import { createStackNavigator } from "@react-navigation/stack"
import { QueryClient } from "@tanstack/react-query"
import React from "react"
import { StyleSheet } from "react-native"
import Welcome from "./screens/common/Welcome"
import { NavigationContainer } from "@react-navigation/native"
import { COLORS } from "./palette/colors"

const querryClient = new QueryClient()
const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					cardStyle: styles.cardStyle,
				}}
			>
				<Stack.Screen name="Welcome" component={Welcome} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
const styles = StyleSheet.create({
	cardStyle: {
		backgroundColor: COLORS.dark,
	},
})
