import { COLORS } from "palette/colors"
import React from "react"
import { Appbar } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { Flex } from "@react-native-material/core"
import useUser from "contexts/user/UserContext"
import { ROLES } from "constants/Constants"
interface BottomAppbarProps {
	navigation: any
	children: React.ReactNode
}

const BottomAppbarLayout = ({ navigation, children }: BottomAppbarProps) => {
	const { role } = useUser()
	const isAdmin = role === ROLES.admin
	const navigationRoutes: NavigationRoutes = {
		[ROLES.student]: "StudentStatistics",
		[ROLES.professor]: "ProfessorStatistics",
		[ROLES.admin]: "AdminStatistics",
	}

	return (
		<Flex justify="between" style={{ height: "100%" }}>
			{children}
			<View style={{ height: 0 }} />
			<View style={{ marginTop: 64 }}>
				<Appbar style={[styles.AppBar]} elevated={true}>
					<Appbar.Action
						icon="home"
						iconColor="white"
						onPress={() => navigation.navigate("Home")}
					/>
					{!isAdmin && (
						<Appbar.Action
							icon="chart-line"
							iconColor="white"
							onPress={() => {
								if (role in navigationRoutes) {
									navigation.navigate(navigationRoutes[role])
								}
							}}
						/>
					)}
					{isAdmin && (
						<Appbar.Action
							icon="account-group"
							iconColor="white"
							onPress={() => navigation.navigate("AdminPeople")}
						/>
					)}

					{!isAdmin && (
						<Appbar.Action
							icon={"bell"}
							iconColor="white"
							onPress={() => navigation.navigate("Notifications")}
						/>
					)}
					<Appbar.Action
						icon="cog"
						iconColor="white"
						onPress={() => navigation.navigate("StudentSettings")}
					/>
				</Appbar>
			</View>
		</Flex>
	)
}

export default BottomAppbarLayout

const styles = StyleSheet.create({
	AppBar: {
		backgroundColor: COLORS.charcoal,
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "space-around",
	},
})

interface NavigationRoutes {
	[role: string]: string
}
