import { HStack, VStack } from "@react-native-material/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ICourse, createSection, fetchCourse } from "Api/Professor/Course"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TextButton from "components/common/TextButton"
import TopTextInArch from "components/common/TopTextInArch"
import { ROLES } from "constants/Constants"
import useUser from "contexts/user/UserContext"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Linking, ScrollView, Text, View } from "react-native"
import { Divider } from "react-native-flex-layout"
import {
	Button,
	IconButton,
	List,
	Modal,
	ProgressBar,
	TextInput,
} from "react-native-paper"
import Icon from "react-native-vector-icons/Feather"
import Section from "screens/common/Section"

const Course = ({ route, navigation }: any) => {
	const { courseId } = route.params

	const marginLeft = 10
	const { role, personId } = useUser()
	const isProfessor = role === ROLES.professor

	const [addSectionVisible, setAddSectionVisible] = useState(false)

	const [addSectionNameError, setAddSectionNameError] = useState(false)
	const [addSectionSummaryError, setAddSectionSummaryError] = useState(false)

	const [addSectionName, setAddSectionName] = useState("")
	const [addSectionSummary, setAddSectionSummary] = useState("")

	const [refreshCourse, setRefreshCourse] = useState(false)

	const [course, setCourse] = useState<ICourse>({
		name: "",
		shortName: "",
		summary: "",
		materialsUrl: "",
		sections: [],
	})
	useQuery(["course", courseId, refreshCourse], () => fetchCourse(courseId, personId), {
		onSuccess: (data) => setCourse(data),
		onError: (error) => console.log(error),
	})


	const handleAddSection = () => {
		addSectionName.length === 0
			? setAddSectionNameError(true)
			: setAddSectionNameError(false)

		addSectionSummary.length === 0
			? setAddSectionSummaryError(true)
			: setAddSectionSummaryError(false)

		if (addSectionNameError || addSectionSummaryError) return

		createSectionMutation.mutate({
			courseId: courseId,
			name: addSectionName,
			summary: addSectionSummary,
		})
		setAddSectionVisible(false)
	}

	const createSectionMutation = useMutation({
		mutationFn: (data: any) => createSection(data),
		onSuccess: (_: any) => {
			console.log("Section created successfully!")
			setRefreshCourse(true)
		},
		onError: ({ response: { data } }) => {
			console.log(data)
		},
	})

	return (
		<BottomAppbarLayout navigation={navigation}>
			<ScrollView>
				<TopTextInArch
					firstLine={course.name}
					secondLine={course.shortName}
				/>
				<VStack
					style={{
						marginHorizontal: 2 * marginLeft,
						marginTop: 20,
					}}
					spacing={5}
				>
					<Text
						style={{
							fontSize: 20,
							textAlign: "left",
							color: COLORS.blue,
						}}
					>
						Summary
					</Text>
					<Text
						style={{
							fontSize: 15,
							textAlign: "left",
							color: COLORS.white,
						}}
					>
						{course.summary}
					</Text>
				</VStack>
				<Divider
					style={{
						marginVertical: 20,
						marginHorizontal: 2 * marginLeft,
					}}
				/>
				<HStack
					style={{
						marginHorizontal: 2 * marginLeft,
						marginTop: 20,
						justifyContent: "space-around",
					}}
					spacing={5}
				>
					<Icon
						name="file"
						size={40}
						color={COLORS.blue}
						style={{
							borderRadius: 15,
							borderWidth: 2,
							borderColor: COLORS.blue,
							padding: 8,
							paddingRight: 4,
							alignSelf: "center",
							marginRight: 15,
						}}
					/>
					<VStack style={{ width: "70%" }}>
						<Text
							style={{
								color: COLORS.blue,
								fontSize: 15,
								fontWeight: "bold",
							}}
						>
							Supporting Materials
						</Text>
						<Text
							style={{
								color: COLORS.white,
								fontSize: 15,
							}}
						>
							Read course materials before trying to answer the
							quizzes.
						</Text>
					</VStack>

					<IconButton
						icon="link"
						size={20}
						iconColor={COLORS.blue}
						style={{
							borderRadius: 15,
							borderWidth: 2,
							borderColor: COLORS.blue,
							padding: 4,
							alignSelf: "center",
						}}
						onPress={() => {
							Linking.openURL(course.materialsUrl)
						}}
					/>
				</HStack>
				<Divider
					style={{
						marginVertical: 20,
						marginHorizontal: 2 * marginLeft,
					}}
				/>
				<View
					style={{
						marginHorizontal: 2 * marginLeft,
						marginTop: isProfessor ? 0 : 20,
					}}
				>
					{isProfessor && (
						<Button
							icon="plus-circle-outline"
							contentStyle={{
								backgroundColor: COLORS.blue,
								flexDirection: "row-reverse",
							}}
							mode="contained"
							onPress={() => {
								setAddSectionVisible(true)
							}}
							style={{ alignSelf: "flex-end" }}
						>
							{"Add Section"}
						</Button>
					)}
					<List.AccordionGroup>
						{course.sections.map((section) => {
							return (
								<VStack
									key={section.id + " VStack"}
									id={section.id + " VStack"}
								>
									<Section
										section={section}
										refreshCourse={refreshCourse}
										setRefreshCourse={setRefreshCourse}
										navigation={navigation}
									/>
									<ProgressBar
										key={section.id + " pb"}
										id={section.id + " pb"}
										progress={section.progress}
										color={COLORS.blue}
										style={{
											marginVertical: 10,
											width: "95%",
											alignSelf: "center",
										}}
									/>
								</VStack>
							)
						})}
					</List.AccordionGroup>
				</View>
			</ScrollView>
			<Modal
				visible={addSectionVisible}
				style={{
					width: "80%",
					height: 400,
					backgroundColor: COLORS.dark,
					borderRadius: 20,
					position: "absolute",
					top: 50,
					left: 50,
					padding: 20,
				}}
				onDismiss={() => setAddSectionVisible(false)}
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
						Add a Section
					</Text>
					<TextInput
						style={{
							color: COLORS.white,
							backgroundColor: COLORS.charcoal,
							padding: 10,
						}}
						placeholder="Section Name"
						placeholderTextColor={COLORS.white}
						onChangeText={(text) => setAddSectionName(text)}
						textColor={COLORS.white}
						mode="outlined"
						theme={{
							roundness: 20,
							colors: { primary: COLORS.blue },
						}}
						autoCapitalize="none"
						error={addSectionNameError}
					/>
					<TextInput
						style={{
							color: COLORS.white,
							backgroundColor: COLORS.charcoal,
							padding: 10,
						}}
						placeholder="Section summary"
						placeholderTextColor={COLORS.white}
						onChangeText={(text) => setAddSectionSummary(text)}
						textColor={COLORS.white}
						mode="outlined"
						theme={{
							roundness: 20,
							colors: { primary: COLORS.blue },
						}}
						autoCapitalize="none"
						error={addSectionSummaryError}
						multiline={true}
						numberOfLines={2}
						maxLength={80}
					/>
					<TextButton
						onPress={() => {
							handleAddSection()
						}}
						text="Submit"
					/>
				</VStack>
			</Modal>
		</BottomAppbarLayout>
	)
}

export default Course
