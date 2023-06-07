import { HStack, VStack } from "@react-native-material/core"
import { useQuery } from "@tanstack/react-query"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import { NotificationContext } from "contexts/user/NotificationContext"
import { COLORS } from "palette/colors"
import React, { useContext, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { Surface } from "react-native-paper"

export interface INotification {
	id: string
	title: string
	text: string
	dateReceived: string
	read: boolean
}

const Notifications = ({  navigation }: any) => {
	const notifications = useContext(NotificationContext);
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
