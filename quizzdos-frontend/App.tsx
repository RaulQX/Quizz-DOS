import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { StyleSheet } from "react-native"
import Welcome from "./screens/common/Welcome"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { COLORS } from "./palette/colors"
import Login from "screens/common/Login"
import SignUp from "screens/common/SignUp"

const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					cardStyle: styles.cardStyle,
				}}
			>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="SignUp" component={SignUp} />
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
