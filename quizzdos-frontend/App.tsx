import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from "contexts/user/UserContext"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet } from "react-native"
import AdminHome from "screens/Admin/AdminHome"
import AdminPeople from "screens/Admin/AdminPeople"
import CreateCourse from "screens/Professor/CreateCourse"
import CreateQuiz from "screens/Professor/CreateQuiz"
import ProfessorStatistics from "screens/Professor/ProfessorStatistics"
import Quiz from "screens/Student/Quiz/Quiz"
import QuizResult from "screens/Student/Quiz/QuizResult"
import QuizStart from "screens/Student/Quiz/QuizStart"
import StudentStatistics from "screens/Student/StudentStatistics"
import CommonHome from "screens/common/CommonHome"
import FirstTimeSignIn from "screens/common/FirstTimeSignIn"
import Home from "screens/common/Home"
import Login from "screens/common/Login"
import Notifications from "screens/common/Notifications"
import Settings from "screens/common/Settings"
import SignUp from "screens/common/SignUp"
import { COLORS } from "./palette/colors"
import Course from "./screens/common/Course"
import Welcome from "./screens/common/Welcome"

const Stack = createStackNavigator()
const querryClient = new QueryClient()

export default function App() {
	return (
		<AppContainter>
			<Stack.Screen name="Welcome" component={Welcome} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="AdminPeople" component={AdminPeople} />
			<Stack.Screen name="AdminHome" component={AdminHome} />
			<Stack.Screen
				name="ProfessorStatistics"
				component={ProfessorStatistics}
			/>
			<Stack.Screen name="Quiz" component={Quiz} />
			<Stack.Screen name="QuizStart" component={QuizStart} />
			<Stack.Screen name="Course" component={Course} />
			<Stack.Screen name="CreateCourse" component={CreateCourse} />
			<Stack.Screen name="CommonHome" component={CommonHome} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen
				name="StudentStatistics"
				component={StudentStatistics}
			/>
			<Stack.Screen name="Notifications" component={Notifications} />
			<Stack.Screen name="CreateQuiz" component={CreateQuiz} />

			<Stack.Screen name="QuizResult" component={QuizResult} />
			<Stack.Screen name="FirstTimeSignIn" component={FirstTimeSignIn} />
		</AppContainter>
	)
}

interface AppContainerProps {
	children: React.ReactNode
}

const AppContainter = ({ children }: AppContainerProps) => {
	return (
		<UserProvider>
			<QueryClientProvider client={querryClient}>
				<NavigationContainer theme={DarkTheme}>
					<StatusBar style="light" />

					<Stack.Navigator
						screenOptions={{
							headerShown: false,
							cardStyle: styles.cardStyle,
						}}
					>
						{children}
					</Stack.Navigator>
				</NavigationContainer>
			</QueryClientProvider>
		</UserProvider>
	)
}

const styles = StyleSheet.create({
	cardStyle: {
		backgroundColor: COLORS.dark,
	},
})
