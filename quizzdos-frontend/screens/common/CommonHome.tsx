import { HStack, VStack } from "@react-native-material/core"
import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { pageSize } from "Api/ApiConstants"
import { fetchCreatedCourses } from "Api/Professor/ProfessorHome"
import { fetchJoinedCourses, joinCourse } from "Api/Student/StudentHome"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TextButton from "components/common/TextButton"
import { ROLES } from "constants/Constants"
import useUser from "contexts/user/UserContext"
import * as Clipboard from "expo-clipboard"
import { IDisplayCourses } from "interfaces/CourseRelated"
import { COLORS } from "palette/colors"
import React, { useEffect, useState } from "react"
import { ScrollView, Text, ToastAndroid, View } from "react-native"
import {
	Avatar,
	Button,
	IconButton,
	Modal,
	ProgressBar,
	TextInput,
	TouchableRipple,
} from "react-native-paper"

const CommonHome = ({ navigation }: any) => {
	const [courses, setCourses] = useState<IDisplayCourses[]>([])

	const { personId, role, firstName } = useUser()
	const [courseFullWidth, setCourseFullWidth] = useState(false)

	const [joinCourseModalVisible, setJoinCourseModalVisible] = useState(false)
	const [joinCourseModalError, setJoinCourseModalError] = useState(false)
	const [joinCourseModalCourseCode, setJoinCourseModalCourseCode] =
		useState("")

	const [createCourseModalVisible, setCreateCourseModalVisible] =
		useState(false)

	const isStudent = role === ROLES.student
	const fetchFunction = isStudent ? fetchJoinedCourses : fetchCreatedCourses

	const {
		refetch,
		data: pages,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		["courses", personId, pageSize],
		({ pageParam = 1 }) =>
			fetchFunction({
				personId,
				creatorId: personId,
				pageParam,
				pageSize,
			}),
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.page != lastPage.totalPages) {
					return lastPage.page + 1
				}
				return false
			},

			enabled: true,
		}
	)

	useEffect(() => {
		if (pages) {
			const newCourses = pages.pages.flatMap((page) => page.data)
			setCourses(newCourses)
		}
	}, [pages])

	const joinCourseMutation = useMutation({
		mutationFn: (data: any) => joinCourse(data),
		onSuccess: () => {
			setJoinCourseModalVisible(false)
			refetch()
		},
		onError: (data) => {
			setJoinCourseModalError(true)
		},
	})
	const handleJoinCourse = async () => {
		joinCourseMutation.mutate({
			courseCode: joinCourseModalCourseCode,
			personId,
		})
	}

	return (
		<>
			<BottomAppbarLayout navigation={navigation}>
				<ScrollView
					onScroll={({ nativeEvent }) => {
						if (
							nativeEvent.layoutMeasurement.height +
								nativeEvent.contentOffset.y >=
								nativeEvent.contentSize.height &&
							hasNextPage
						) {
							fetchNextPage()
						}
					}}
					scrollEventThrottle={0}
				>
					<HStack
						style={{ marginHorizontal: 5, marginTop: 20 }}
						justify="between"
					>
						<IconButton
							icon="dots-grid"
							iconColor={COLORS.white}
							size={40}
							style={{ alignSelf: "center" }}
							onPress={() => {
								setCourseFullWidth(!courseFullWidth)
							}}
						/>
						<Avatar.Icon
							size={40}
							icon="account" // adauga gender-wide icon
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
							Hello, {firstName}
						</Text>
						<Text style={{ color: COLORS.white, fontSize: 16 }}>
							Welcome to your{" "}
							<Text style={{ color: COLORS.blue }}>courses</Text>.
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
								<Text style={{ fontWeight: "bold" }}>
									Courses
								</Text>
							</Text>
							<Button
								icon="plus-circle-outline"
								contentStyle={{
									backgroundColor: COLORS.blue,
									flexDirection: "row-reverse",
								}}
								mode="contained"
								onPress={() => {
									isStudent
										? setJoinCourseModalVisible(true)
										: setCreateCourseModalVisible(true)
								}}
							>
								{isStudent ? "Join" : "Create"}
							</Button>
						</HStack>
						<HStack justify="between" wrap="wrap">
							{courses.map((course) => (
								<TouchableRipple
									key={course.id}
									style={{
										backgroundColor: COLORS.blue,
										width: courseFullWidth ? "100%" : "47%",
										height: 150,
										borderRadius: 20,
										marginTop: 15,
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
										navigation.navigate("Course", {
											courseId: course.id,
										})
									}
									onLongPress={() => {
										Clipboard.setStringAsync(
											course.code
										).then((content) => {
											ToastAndroid.show(
												"Course code copied to clipboard",
												ToastAndroid.SHORT
											)
										})
									}}
								>
									<VStack
										style={{
											marginTop: 10,
											width: "100%",
										}}
									>
										<View
											style={{
												alignSelf: "center",
											}}
										>
											<IconButton
												mode="contained"
												icon={course.icon}
												size={40}
												style={{
													backgroundColor:
														COLORS.white,
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
											{course.shortName}
										</Text>
										<Text
											style={{
												color: COLORS.white,
												fontSize: 16,
												textAlign: "center",
											}}
										>
											{course.sectionsNumber}{" "}
											{course.sectionsNumber === 1
												? "section"
												: "sections"}
										</Text>
										{isStudent && (
											<ProgressBar
												progress={course.progress}
												style={{
													width: "80%",
													alignSelf: "center",
													marginTop: 6,
													borderRadius: 20,
												}}
											/>
										)}
									</VStack>
								</TouchableRipple>
							))}
						</HStack>
					</VStack>
				</ScrollView>
			</BottomAppbarLayout>
			<Modal
				visible={joinCourseModalVisible}
				style={{
					width: "80%",
					height: 300,
					backgroundColor: COLORS.dark,
					borderRadius: 20,
					position: "absolute",
					top: 150,
					left: 50,
					padding: 20,
				}}
				onDismiss={() => setJoinCourseModalVisible(false)}
			>
				<VStack spacing={35}>
					<Text
						style={{
							color: COLORS.white,
							textAlign: "center",
							fontSize: 20,
							fontWeight: "bold",
						}}
					>
						Join course
					</Text>
					<TextInput
						style={{
							color: COLORS.white,
							backgroundColor: COLORS.charcoal,
							padding: 10,
						}}
						placeholder="Course code"
						placeholderTextColor={COLORS.white}
						onChangeText={(text) =>
							setJoinCourseModalCourseCode(text)
						}
						textColor={COLORS.white}
						mode="outlined"
						theme={{
							roundness: 20,
							colors: { primary: COLORS.blue },
						}}
						autoCapitalize="none"
						error={joinCourseModalError}
					/>
					<TextButton
						onPress={() => handleJoinCourse()}
						text="Submit"
					/>
				</VStack>
			</Modal>
			<Modal
				visible={createCourseModalVisible}
				style={{
					width: "80%",
					height: 200,
					backgroundColor: COLORS.dark,
					borderRadius: 20,
					position: "absolute",
					top: 150,
					left: 50,
					padding: 20,
				}}
				onDismiss={() => setCreateCourseModalVisible(false)}
			>
				<VStack spacing={35}>
					<Text
						style={{
							color: COLORS.white,
							textAlign: "center",
							fontSize: 20,
							fontWeight: "bold",
						}}
					>
						Are you sure you want to create a new course?
					</Text>
					<HStack justify="around">
						<TextButton
							onPress={() => {
								navigation.navigate("CreateCourse", {
									refetch: refetch,
								})
								setCreateCourseModalVisible(false)
							}}
							text="Yes"
						/>
						<TextButton
							onPress={() => {
								setCreateCourseModalVisible(false)
							}}
							text="Cancel"
							style={{ backgroundColor: COLORS.gray }}
						/>
					</HStack>
				</VStack>
			</Modal>
		</>
	)
}

export default CommonHome
