import { HStack, VStack } from "@react-native-material/core"
import { useQuery } from "@tanstack/react-query"
import { fetchStudentStatistics } from "Api/Student/StudentStatistics"
import BlueChart from "components/chart/BlueChart"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import BlueListAccordion from "components/list/BlueListAccordion"
import { listStyles } from "components/list/ListStyles"
import useUser from "contexts/user/UserContext"
import { ICourse, ISection } from "interfaces/CourseRelated"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { Avatar, Divider, List } from "react-native-paper"

const emptyCourse: ICourse = {
	id: "",
	shortName: "",
	sections: [],
}

const emptySection: ISection = {
	id: "",
	name: "",
	quizzes: [],
	average: 0,
}
export interface IQuiz {
	id: string
	name: string
	grade: number
}

const StudentStatistics = ({ navigation }: any) => {
	const [course, setCourse] = useState<ICourse>(emptyCourse)
	const [allCourses, setAllCourses] = useState(true)
	const [coursesExpanded, setCoursesExpanded] = useState(false)
	const [courseTitle, setCourseTitle] = useState("Pick Course")

	const [section, setSection] = useState<ISection>(emptySection)
	const [allSections, setAllSections] = useState(true)
	const [sectionExpanded, setSectionExpanded] = useState(false)
	const [sectionTitle, setSectionTitle] = useState("Pick Section")

	const [onlyOneSectionExpanded, setOnlyOneSectionExpanded] = useState(true)

	const quizLabels = section.quizzes.map((quiz) => quiz.name)
	const quizGrades = section.quizzes.map((quiz) => quiz.grade)

	const { personId } = useUser()

	const [statistics, setStatistics] = useState<ICourse[]>([
		{
			id: "",
			shortName: "",
			sections: [],
		},
	])

	useQuery(
		["statistics", personId, statistics],
		() => fetchStudentStatistics(personId),
		{
			onSuccess: (data) => setStatistics(data),
			onError: (error) => console.log(error),
		}
	)

	const sectionList: ISection[] = allCourses
		? statistics.flatMap((course) => course.sections)
		: course.sections

	const sectionLabels = sectionList.map((section) => section.name)
	const sectionGrades = sectionList.map((section) => section.average)

	return (
		<BottomAppbarLayout navigation={navigation}>
			<ScrollView>
				<HStack
					style={{ marginRight: 15, marginLeft: 20, marginTop: 30 }}
					justify="between"
				>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 30,
							fontWeight: "600",
						}}
					>
						Statistics
					</Text>
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

				<VStack style={{ marginTop: 30, marginLeft: 20 }}>
					<HStack
						style={{
							justifyContent: "space-between",
							marginHorizontal: 7,
						}}
					>
						<Text
							style={{
								color: COLORS.white,
								fontSize: 20,
								fontWeight: "600",
							}}
						>
							Course
						</Text>
						<Text
							style={{
								color: COLORS.white,
								fontSize: 20,
								fontWeight: "600",
								marginRight: 25,
							}}
						>
							Section
						</Text>
					</HStack>
					<HStack>
						<View
							style={{
								justifyContent: "flex-start",
								width: "49%",
							}}
						>
							<BlueListAccordion
								title={courseTitle}
								expanded={coursesExpanded}
								onPress={() => {
									setCoursesExpanded(!coursesExpanded)
								}}
								key={"left"}
								id={"left list"}
								iconPositionOnRight={true}
							>
								<List.Item
									title="All Courses"
									onPress={() => {
										setAllCourses(true)
										setCoursesExpanded(false)
										setCourseTitle("All Courses")
									}}
									style={listStyles.listItem}
									titleStyle={listStyles.listItemTitle}
								/>
								{statistics.map((course) => (
									<List.Item
										key={course.id + "course"}
										title={course.shortName}
										onPress={() => {
											setCourse(course)
											setAllCourses(false)
											setCoursesExpanded(false)
											setCourseTitle(course.shortName)

											setSection(emptySection)
											setAllSections(false)
											setSectionExpanded(false)
											setSectionTitle("Pick Section")
										}}
										style={listStyles.listItem}
										titleStyle={listStyles.listItemTitle}
									/>
								))}
							</BlueListAccordion>
						</View>
						<View style={{ width: "49%" }}>
							<BlueListAccordion
								title={sectionTitle}
								expanded={sectionExpanded}
								onPress={() => {
									setSectionExpanded(!sectionExpanded)
								}}
								key={"right"}
								titleStyle={[
									listStyles.listAccordianTitle,
									{ alignSelf: "flex-end" },
								]}
								id={"right list"}
								iconPositionOnRight={false}
							>
								<List.Item
									title="All Sections"
									onPress={() => {
										setAllSections(true)
										setSectionExpanded(false)
										setSectionTitle("All Sections")
									}}
									style={[
										listStyles.listItem,
										{ marginLeft: 20 },
									]}
									titleStyle={listStyles.listItemTitle}
								/>
								{sectionList.map((section) => (
									<List.Item
										key={section.id + "section"}
										title={section.name}
										onPress={() => {
											setSection(section)
											setAllSections(false)
											setSectionExpanded(false)
											setSectionTitle(section.name)
										}}
										style={[
											listStyles.listItem,
											{ marginLeft: 20 },
										]}
										titleStyle={listStyles.listItemTitle}
									/>
								))}
							</BlueListAccordion>
						</View>
					</HStack>
					{allSections && (
						<BlueChart
							labels={sectionLabels}
							values={sectionGrades}
						/>
					)}
					{!allSections && section.name === "" && (
						<View
							style={{
								backgroundColor: COLORS.blue,
								borderRadius: 20,
								marginTop: 20,
								marginBottom: 20,
								paddingVertical: 15,
								marginRight: 20,
								height: 250,
							}}
						>
							<Text
								style={{
									color: COLORS.white,
									fontSize: 20,
									fontWeight: "600",
									alignSelf: "center",
									textAlignVertical: "center",
								}}
							>
								Select a section to view grades
							</Text>
						</View>
					)}
					{!allSections && section.name !== "" && (
						<BlueChart labels={quizLabels} values={quizGrades} />
					)}
					{allCourses && (
						<>
							{statistics.map((course) => (
								<BlueListAccordion
									title={course.shortName}
									onPress={() => {
										setCourse(course)
										setAllSections(true)
										setSectionTitle("All Sections")
									}}
									key={course.id + "listCourse"}
									id={course.id}
									iconPositionOnRight={true}
								>
									{course.sections.map((section) => (
										<View
											style={{
												backgroundColor: COLORS.dark,
												marginLeft: "-15%",
											}}
										>
											<BlueListAccordion
												id={section.id}
												title={section.name}
												onPress={() => {
													setSection(section)
													setAllSections(false)
													setSectionTitle(
														section.name
													)
													setCourseTitle(
														course.shortName
													)
												}}
												iconPositionOnRight={true}
											>
												<List.Item
													title="Average"
													style={listStyles.listItem}
													titleStyle={{
														color: COLORS.almostWhite,
													}}
													right={(props) => (
														<Text
															style={{
																color: COLORS.almostWhite,
															}}
														>
															{section.average}
														</Text>
													)}
												/>
												<Divider
													style={{
														width: "90%",
														marginLeft: 16,
														borderColor:
															COLORS.almostWhite,
													}}
												/>
												{section.quizzes.map((quiz) => (
													<>
														<List.Item
															key={
																quiz.id + "quiz"
															}
															title={quiz.name}
															style={
																listStyles.listItem
															}
															titleStyle={
																listStyles.listItemTitle
															}
															right={(props) => (
																<Text
																	style={{
																		color: COLORS.white,
																	}}
																>
																	{quiz.grade}
																</Text>
															)}
														/>
														<Divider
															style={{
																width: "90%",
																marginLeft: 16,
															}}
														/>
													</>
												))}
											</BlueListAccordion>
										</View>
									))}
								</BlueListAccordion>
							))}
						</>
					)}
					{!allCourses && !allSections && section.name != "" && (
						<BlueListAccordion
							id={section.id}
							title={section.name}
							onPress={() => {
								setSection(section)
								setAllSections(false)
								setSectionTitle(section.name)
								setCourseTitle(course.shortName)
								setOnlyOneSectionExpanded(
									!onlyOneSectionExpanded
								)
							}}
							iconPositionOnRight={true}
							expanded={onlyOneSectionExpanded}
						>
							<List.Item
								title="Average"
								style={listStyles.listItem}
								titleStyle={{ color: COLORS.almostWhite }}
								right={(props) => (
									<Text style={{ color: COLORS.almostWhite }}>
										{section.average}
									</Text>
								)}
							/>
							{section.quizzes.map((quiz) => (
								<>
									<List.Item
										key={quiz.id + "listQuiz"}
										title={quiz.name}
										style={listStyles.listItem}
										titleStyle={listStyles.listItemTitle}
										right={(props) => (
											<Text
												style={{
													color: COLORS.white,
												}}
											>
												{quiz.grade}
											</Text>
										)}
									/>
								</>
							))}
						</BlueListAccordion>
					)}
					{!allCourses &&
						allSections &&
						course.sections.map((section) => (
							<BlueListAccordion
								id={section.id}
								title={section.name}
								onPress={() => {
									setSection(section)
									setAllSections(false)
									setSectionTitle(section.name)
								}}
								iconPositionOnRight={true}
							>
								<List.Item
									title="Average"
									style={listStyles.listItem}
									titleStyle={{
										color: COLORS.almostWhite,
									}}
									right={(props) => (
										<Text
											style={{
												color: COLORS.almostWhite,
											}}
										>
											{section.average}
										</Text>
									)}
								/>
								{section.quizzes.map((quiz) => (
									<>
										<List.Item
											key={quiz.id + "lowerQuiz"}
											title={quiz.name}
											style={listStyles.listItem}
											titleStyle={
												listStyles.listItemTitle
											}
											right={(props) => (
												<Text
													style={{
														color: COLORS.white,
													}}
												>
													{quiz.grade}
												</Text>
											)}
										/>
									</>
								))}
							</BlueListAccordion>
						))}
				</VStack>
			</ScrollView>
		</BottomAppbarLayout>
	)
}

//

export default StudentStatistics
