import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { StyleSheet } from "react-native"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { COLORS } from "./palette/colors"
import Welcome from "./screens/common/Welcome"
import Login from "screens/common/Login"
import SignUp from "screens/common/SignUp"
import FirstTimeSignIn from "screens/common/FirstTimeSignIn"
import Course from "./screens/Student/Course"
import StudentHome from "screens/Student/StudentHome"
import StudentStatistics from "screens/Student/StudentStatistics"
import Notifications from "screens/common/Notifications"
import QuizStart from "screens/Student/QuizStart"

const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<StatusBar style="light" />
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					cardStyle: styles.cardStyle,
				}}
			>
				<Stack.Screen name="QuizStart" component={QuizStart} />

				<Stack.Screen name="Course" component={Course} />
				<Stack.Screen name="Notifications" component={Notifications} />
				<Stack.Screen
					name="StudentStatistics"
					component={StudentStatistics}
				/>

				<Stack.Screen name="StudentHome" component={StudentHome} />

				<Stack.Screen
					name="FirstTimeSignIn"
					component={FirstTimeSignIn}
				/>
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
