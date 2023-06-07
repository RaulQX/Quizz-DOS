import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Appbar } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { Flex } from "@react-native-material/core"
import useUser from "contexts/user/UserContext"
import { ROLES } from "constants/Constants"
import { useQuery } from "@tanstack/react-query"
import { fetchNotifications } from "Api/Common/Notifications"
import { INotification } from "screens/common/Notifications"
import { NotificationContext } from "contexts/user/NotificationContext"
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

	const [notifications, setNotifications] = useState<INotification[]>([])

	useQuery(["notifications", personId], () => fetchNotifications(personId), {
		onSuccess: (data) => {
			setNotifications(data)
		},
		onError: (error) => console.log(error),
		refetchInterval: 30000,
	})

	return (
		<NotificationContext.Provider value={notifications}>
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
										navigation.navigate(
											navigationRoutes[role]
										)
									}
								}}
							/>
						)}
						{isAdmin && (
							<Appbar.Action
								icon="account-group"
								iconColor="white"
								onPress={() =>
									navigation.navigate("AdminPeople")
								}
							/>
						)}

						{!isAdmin && (
							<Appbar.Action
								icon={
									notifications.every(
										(notification) =>
											notification.read === true
									)
										? "bell"
										: "bell-badge"
								}
								iconColor="white"
								onPress={() =>
									navigation.navigate("Notifications")
								}
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
		</NotificationContext.Provider>
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
