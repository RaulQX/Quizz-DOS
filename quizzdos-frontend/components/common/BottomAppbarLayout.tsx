import { Flex } from "@react-native-material/core"
import { useQuery } from "@tanstack/react-query"
import { fetchHasUnreadNotifications } from "Api/Common/Notifications"
import { ROLES } from "constants/Constants"
import useUser from "contexts/user/UserContext"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Appbar } from "react-native-paper"

interface BottomAppbarProps {
	navigation: any
	children: React.ReactNode
}

const BottomAppbarLayout = ({ navigation, children }: BottomAppbarProps) => {
	const { role, personId } = useUser()
	const isAdmin = role === ROLES.admin
	const navigationRoutes: NavigationRoutes = {
		[ROLES.student]: "StudentStatistics",
		[ROLES.professor]: "ProfessorStatistics",
	}

	const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)

	useQuery(
		["notifications", personId],
		() => fetchHasUnreadNotifications(personId),
		{
			onSuccess: (data) => {
				setHasUnreadNotifications(data)
			},
			onError: (error) => console.log(error),
			refetchInterval: 25000,
		}
	)

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
							icon={
								!hasUnreadNotifications ? "bell" : "bell-badge"
							}
							iconColor="white"
							onPress={() => navigation.navigate("Notifications")}
						/>
					)}
					<Appbar.Action
						icon="cog"
						iconColor="white"
						onPress={() => navigation.navigate("Settings")}
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
