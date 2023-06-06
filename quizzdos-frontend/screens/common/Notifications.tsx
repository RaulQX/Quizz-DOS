import { HStack, VStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import { COLORS } from "palette/colors"
import React from "react"
import { ScrollView, Text, View } from "react-native"
import { Surface } from "react-native-paper"

const constProps = {
	notifications: [
		{
			id: "01",
			title: "Well done!",
			text: `You have successfully completed the section 'Introduction'`,
			dateReceived: "2021-05-01",
			read: false,
		},
		{
			id: "02",
			title: "Good Job!",
			text: `You have successfully completed the quiz 'Big O Notation'`,
			dateReceived: "2021-05-01",
			read: false,
		},
		{
			id: "0",
			title: "Congratulations!",
			text: `You have successfully completed the course 'CS 101'`,
			dateReceived: "2021-05-01",
			read: false,
		},
		{
			id: "1",
			title: "New Quiz Available",
			text: `A new quiz has been added to the 'Section 1' of the course 'CS 101'`,
			dateReceived: "2021-04-01",
			read: false,
		},
		{
			id: "2",
			title: "New Quiz Available",
			text: `A new quiz has been added to the 'Section 1' of the course 'CS 101'`,
			dateReceived: "2021-03-01",
			read: false,
		},
		{
			id: "3",
			title: "New Quiz Available",
			text: `A new quiz has been added to the 'Section 1' of the course 'CS 101'`,
			dateReceived: "2021-02-01",
			read: false,
		},
		{
			id: "4",
			title: "New Section Available",
			text: `A new section has been added to the course 'CS 101'`,
			dateReceived: "2021-01-01",
			read: true,
		},
		{
			id: "5",
			title: "You successfully joined the course 'CS 101'",
			text: `You have been added to the course 'CS 101'`,
			dateReceived: "2021-01-01",
			read: true,
		},
	],
}

const Notifications = ({ navigation }: any) => {
	return (
		<BottomAppbarLayout navigation={navigation}>
			<ScrollView>
				<View style={{ marginTop: 30, alignItems: "center" }}>
					<Text style={{ color: COLORS.white, fontSize: 28 }}>
						Notifications
					</Text>
				</View>
				<VStack style={{ marginTop: 30 }}>
					{constProps.notifications.map((notification) => (
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
