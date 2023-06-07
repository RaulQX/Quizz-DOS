import { HStack, VStack } from "@react-native-material/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchNotifications, markAsRead } from "Api/Common/Notifications"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import useUser from "contexts/user/UserContext"
import { COLORS } from "palette/colors"
import React, { useContext, useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { Surface } from "react-native-paper"

export interface INotification {
	id: string
	title: string
	text: string
	dateReceived: string
	read: boolean
}

const Notifications = ({ navigation }: any) => {
	const { personId } = useUser()
	const [notifications, setNotifications] = useState<INotification[]>([])

	const markAsReadMutation = useMutation({
		mutationFn: (notificationsIds: string[]) =>
			markAsRead(notificationsIds),
		onError: (error) => console.log(error),
	})

	useQuery(["notificationz", personId], () => fetchNotifications(personId), {
		onSuccess: (data) => {
			setNotifications(data)
		},
		onError: (error) => console.log(error),
	})

	useEffect(() => {
		if (notifications.length > 0) {
			const notificationIds = notifications.map(
				(notification) => notification.id
			)
			markAsReadMutation.mutate(notificationIds)
		}
	}, [notifications])

	return (
		<BottomAppbarLayout navigation={navigation}>
			<ScrollView>
				<View style={{ marginTop: 30, alignItems: "center" }}>
					<Text style={{ color: COLORS.white, fontSize: 28 }}>
						Notifications
					</Text>
				</View>
				<VStack style={{ marginTop: 30 }}>
					{notifications.map((notification: INotification) => (
						<Surface
							key={notification.id}
							style={{
								width: "90%",
								marginVertical: 10,
								padding: 15,
								borderRadius: 10,
								elevation: 4,
								backgroundColor: COLORS.blue,
								alignSelf: "center",
							}}
						>
							<HStack
								justify="between"
								style={{ marginBottom: 5, width: "100%" }}
							>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "bold",
										width: "80%",
									}}
								>
									{notification.title}
								</Text>
								<Text
									style={{
										fontSize: 14,
										color: COLORS.white,
										textAlign: "right",
									}}
								>
									{notification.dateReceived}
								</Text>
							</HStack>
							<Text style={{ fontSize: 16 }}>
								{notification.text}
							</Text>
						</Surface>
					))}
				</VStack>
			</ScrollView>
		</BottomAppbarLayout>
	)
}

export default Notifications
