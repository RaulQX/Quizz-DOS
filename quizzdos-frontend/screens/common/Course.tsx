import { VStack, HStack } from "@react-native-material/core"
import Section from "components/Student/Section"
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
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TopTextInArch from "components/common/TopTextInArch"
import TextButton from "components/common/TextButton"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ICourse, createSection, fetchCourse } from "Api/Professor/Course"
const constProps = {
	name: "Introduction to Algorithms",
	shortName: "IA",
	summary:
		"The course covers topics such as algorithmic problem-solving, data structures, sorting and searching algorithms, graph algorithms, and dynamic programming.",
	materialsURL: "https://www.google.com",
	sections: [
		{
			progress: 0.5,
			id: "1",
			name: "Introduction",
			summary: "Algorithm efficiency using Big O notation ",
			quizzes: [
				{
					id: "2234-5678-9112-3123211",
					name: "Quiz 1",
					status: 2,
				},
				{
					id: "3234-5678-9112-3123212",
					name: "Quiz 2",
					status: 1,
				},
				{
					id: "4234-5678-9112-3123213",
					name: "Quiz 3",
					status: 0,
				},
				{
					id: "2234-5678-9112-1123211",
					name: "Quiz 4",
					status: 2,
				},
				{
					id: "3234-5678-9112-3113212",
					name: "Quiz 5",
					status: 1,
				},
				{
					id: "4234-5678-9112-3143213",
					name: "Quiz 6",
					status: 0,
				},
			],
		},
		{
			id: "2",
			name: "Section 1",
			progress: 0.33,
			summary:
				"This section is about the introduction of algorithms and how to use them in real life.",
			quizzes: [
				{
					id: "6234-5678-9112-3123211",
					name: "Lists",
					status: 2,
				},
				{
					id: "7234-5678-9112-3123212",
					name: "Queues",
					status: 1,
				},
				{
					id: "72A4-5678-9112-3123212",
					name: "Trees",
					status: 0,
				},
			],
		},
		{
			id: "3",
			name: "Section 2",
			progress: 1,
			summary:
				"Introduction summary of this section with a medium set of characters, not a lot of characters, not too little characters.",
			quizzes: [
				{
					id: "9234-5678-9112-3123211",
					name: "Quiz 1",
					status: 0,
				},
				{
					id: "1034-5678-9112-3123212",
					name: "Quiz 2",
					status: 0,
				},
			],
		},
	],
}

const Course = ({ route, navigation }: any) => {
	//const { courseId } = route.params
	const courseId = "7AE4652A-BEC6-4BFB-8B12-93E4C5908370"

	const marginLeft = 10
	const isProfessor = true

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
	const { isLoading, error, data, isFetched } = useQuery(
		["course", courseId, refreshCourse],
		() => fetchCourse(courseId),
		{ onSuccess: (data) => setCourse(data) }
	)

	console.log('c', course)

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
					style={{ marginHorizontal: 2 * marginLeft, marginTop: 20 }}
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
									<Section section={section} />
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
					top: 150,
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
