import { VStack, HStack } from "@react-native-material/core"
import Section from "components/Student/Section"
import { COLORS } from "palette/colors"
import React from "react"
import { Linking, ScrollView, Text, View } from "react-native"
import { Divider } from "react-native-flex-layout"
import { IconButton, List, ProgressBar } from "react-native-paper"
import Icon from "react-native-vector-icons/Feather"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TopTextInArch from "components/common/TopTextInArch"
const constProps = {
	name: "Introduction to Algorithms",
	shortName: "IA",
	summary:
		"The course covers topics such as algorithmic problem-solving, data structures, sorting and searching algorithms, graph algorithms, and dynamic programming.",
	progress: 0.6,
	materialsURL: "https://www.google.com",
	sections: [
		{
			progress: 0.5,
			id: "1",
			index: 0,
			name: "Introduction",
			summary: "Algorithm efficiency using Big O notation ",
			quizzes: [
				{
					id: "2234-5678-9112-3123211",
					name: "Quiz 1",
					index: 0,
					status: 2,
				},
				{
					id: "3234-5678-9112-3123212",
					name: "Quiz 2",
					index: 1,
					status: 1,
				},
				{
					id: "4234-5678-9112-3123213",
					name: "Quiz 3",
					index: 2,
					status: 0,
				},
				{
					id: "2234-5678-9112-1123211",
					name: "Quiz 4",
					index: 0,
					status: 2,
				},
				{
					id: "3234-5678-9112-3113212",
					name: "Quiz 5",
					index: 1,
					status: 1,
				},
				{
					id: "4234-5678-9112-3143213",
					name: "Quiz 6",
					index: 2,
					status: 0,
				},
			],
		},
		{
			id: "2",
			index: 1,
			name: "Section 1",
			progress: 0.33,
			summary:
				"This section is about the introduction of algorithms and how to use them in real life.",
			quizzes: [
				{
					id: "6234-5678-9112-3123211",
					name: "Lists",
					index: 0,
					status: 2,
				},
				{
					id: "7234-5678-9112-3123212",
					name: "Queues",
					index: 1,
					status: 1,
				},
				{
					id: "72A4-5678-9112-3123212",
					name: "Trees",
					index: 1,
					status: 0,
				},
			],
		},
		{
			id: "3",
			index: 1,
			name: "Section 2",
			progress: 1,
			summary:
				"Introduction summary of this section with a medium set of characters, not a lot of characters, not too little characters.",
			quizzes: [
				{
					id: "9234-5678-9112-3123211",
					name: "Quiz 1",
					index: 0,
					status: 0,
				},
				{
					id: "1034-5678-9112-3123212",
					name: "Quiz 2",
					index: 1,
					status: 0,
				},
			],
		},
	],
}

const Course = ({ navigation }: any) => {
	const marginLeft = 10

	return (
		<BottomAppbarLayout navigation={navigation}>
			<ScrollView>
				<TopTextInArch
					firstLine={constProps.name}
					secondLine={constProps.shortName}
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
						{constProps.summary}
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
							Linking.openURL(constProps.materialsURL)
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
					style={{ marginHorizontal: 2 * marginLeft, marginTop: 20 }}
				>
					<List.AccordionGroup>
						{constProps.sections.map((section) => {
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
		</BottomAppbarLayout>
	)
}

export default Course
