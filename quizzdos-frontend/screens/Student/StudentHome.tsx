import { HStack, Icon, VStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import { COLORS } from "palette/colors"
import React from "react"
import { Pressable, ScrollView, View } from "react-native"
import { Text } from "react-native"
import {
	Avatar,
	Button,
	IconButton,
	ProgressBar,
	Surface,
	TouchableRipple,
} from "react-native-paper"
import * as Clipboard from "expo-clipboard"
import { ToastAndroid } from "react-native"

const studentHomeConstProps = {
	courses: [
		{
			id: "1",
			name: "Math",
			sections: 5,
			quizzes: 10,
			progress: 0.5,
			icon: "file-table-outline",
			code: "N3K4J5",
		},
		{
			id: "2",
			name: "Science",
			sections: 5,
			quizzes: 12,
			progress: 0.3,
			icon: "alarm-bell",
			code: "N3K4J1",
		},
		{
			id: "3",
			name: "English",
			sections: 2,
			quizzes: 5,
			progress: 0.8,
			icon: "cards-variant",
			code: "AKK4J2",
		},
		{
			id: "4",
			name: "History",
			sections: 3,
			quizzes: 7,
			progress: 0.6,
			icon: "chart-pie",
			code: "MAI412",
		},
		{
			id: "5",
			name: "Geography",
			sections: 4,
			quizzes: 8,
			progress: 0.4,
			icon: "chart-ppf",
			code: "A123D4",
		},
		{
			id: "6",
			name: "Art",
			sections: 2,
			quizzes: 4,
			progress: 0.2,
			icon: "contactless-payment",
			code: "N3K4JS",
		},
		{
			id: "7",
			name: "Music",
			sections: 2,
			quizzes: 4,
			progress: 0.2,
			icon: "fingerprint",
			code: "N3PO06",
		},
	],
}

const StudentHome = ({ navigation }: any) => {
	const gender: number = 0
	//const gender = 1;
	//const gender = 2;

	return (
		<BottomAppbarLayout navigation={navigation}>
			<ScrollView>
				<HStack
					style={{ marginHorizontal: 5, marginTop: 20 }}
					justify="between"
				>
					<IconButton
						icon="dots-grid"
						iconColor={COLORS.white}
						size={40}
						style={{ alignSelf: "center" }}
					/>
					<Avatar.Icon
						size={40}
						icon="account"
						color={COLORS.white}
						style={{
							alignSelf: "center",
							marginRight: 10,
							backgroundColor: COLORS.blue,
						}}
					/>
				</HStack>
				<VStack style={{ marginHorizontal: 25 }} spacing={10}>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 30,
							fontWeight: "bold",
						}}
					>
						Hello, John
					</Text>
					<Text style={{ color: COLORS.white, fontSize: 16 }}>
						Welcome to your{" "}
						<Text style={{ color: COLORS.blue }}>courses</Text>
					</Text>
				</VStack>
				<VStack
					style={{ marginHorizontal: 25, marginTop: 30 }}
					spacing={20}
				>
					<HStack justify="between">
						<Text
							style={{
								color: COLORS.white,
								fontSize: 25,
							}}
						>
							<Text style={{ fontWeight: "bold" }}>Courses</Text>
						</Text>
						<Button
							icon="plus-circle-outline"
							contentStyle={{
								backgroundColor: COLORS.blue,
								flexDirection: "row-reverse",
							}}
							mode="contained"
						>
							Join
						</Button>
					</HStack>
					<HStack justify="between" wrap="wrap">
						{studentHomeConstProps.courses.map((course) => (
							<TouchableRipple
								key={course.id}
								style={{
									backgroundColor: COLORS.blue,
									width: 150,
									height: 150,
									borderRadius: 20,
									marginTop: 15,
									marginHorizontal: 5,
									flexDirection: "row",
									elevation: 5,
									shadowColor: COLORS.black,
									shadowOffset: {
										width: 3,
										height: 2,
									},
									shadowOpacity: 0.55,
									shadowRadius: 3.84,
								}}
								onPress={() =>
									// navigation.navigate("Course", {
									// 	courseId: course.id,
									// })
									console.log("Course pressed")
								}
								onLongPress={() => {
									console.log("Course long pressed")
									Clipboard.setStringAsync(course.code).then(
										(content) => {
											ToastAndroid.show(
												"Course code copied to clipboard",
												ToastAndroid.SHORT
											)
										}
									)
								}}
							>
								<VStack
									style={{ marginTop: 10, width: "100%" }}
								>
									<View style={{ alignSelf: "center" }}>
										<IconButton
											mode="contained"
											icon={course.icon}
											size={40}
											style={{
												backgroundColor: COLORS.white,
												borderRadius: 20,
											}}
											iconColor={COLORS.charcoal}
										/>
									</View>
									<Text
										style={{
											color: COLORS.white,
											fontSize: 20,
											fontWeight: "bold",
											textAlign: "center",
										}}
									>
										{course.name}
									</Text>
									<Text
										style={{
											color: COLORS.white,
											fontSize: 16,
											textAlign: "center",
										}}
									>
										{course.sections} sections
									</Text>
									<ProgressBar
										progress={course.progress}
										style={{
											width: "80%",
											alignSelf: "center",
											marginTop: 6,
											borderRadius: 20,
										}}
									/>
								</VStack>
							</TouchableRipple>
						))}
					</HStack>
				</VStack>
			</ScrollView>
		</BottomAppbarLayout>
	)
}

export default StudentHome
