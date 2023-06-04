import { Flex, HStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { Avatar, IconButton, List, Switch } from "react-native-paper"
import { Text } from "react-native"
import BlueChart from "components/chart/BlueChart"
import BlueListAccordion from "components/list/BlueListAccordion"
import { listStyles } from "components/list/ListStyles"
import {
	IProfessorsStatisticsCourse,
	fetchProfessorsStatistics,
} from "Api/Professor/ProfessorStatistics"
import { useQuery } from "@tanstack/react-query"
import useUser from "contexts/user/UserContext"

interface IPagedStatistics {
	data: IProfessorsStatisticsCourse[]
	pageNumber: number
	pageSize: number
	totalPages: number
}

const ProfessorStatistics = ({ navigation }: any) => {
	const pageSize = 4

	const [showGrades, setShowGrades] = useState(false)
	const { personId } = useUser()
	const [statistics, setStatistics] = useState<IPagedStatistics>({
		data: [],
		pageNumber: 1,
		pageSize: 1,
		totalPages: 1,
	})
	const [pageNumber, setPageNumber] = useState(1)

	useQuery(
		["statistics", personId, statistics, pageNumber],
		() =>
			fetchProfessorsStatistics({
				personId,
				pageParam: pageNumber,
				pageSize,
			}),
		{
			onSuccess: (data) => setStatistics(data),
			onError: (error) => console.log(error),
		}
	)

	console.log(statistics)

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
				<HStack justify="around" items="center">
					<Text
						style={{
							textAlign: "center",
							fontSize: 20,
							color: COLORS.blue,
							fontWeight: "bold",
							marginTop: 20,
						}}
					>
						Your Courses
					</Text>
					<HStack
						items="center"
						style={{ marginTop: 20, width: "30%" }}
					>
						<Switch
							value={showGrades}
							color={COLORS.blue}
							onChange={() => setShowGrades(!showGrades)}
						/>
						<Text
							style={{
								color: COLORS.white,
								fontSize: 14,
								marginLeft: 10,
							}}
						>
							{showGrades ? "Grades" : "Students"}
						</Text>
					</HStack>
				</HStack>

				<HStack
					style={{
						alignItems: "center",
						justifyContent: "center",
						marginLeft: 20,
						marginRight: 20,
					}}
				>
					<IconButton
						icon="chevron-left"
						onPress={() => setPageNumber(pageNumber - 1)}
						iconColor={COLORS.white}
						disabled={pageNumber === 1}
						theme={{ dark: true }}
					/>
					<BlueChart
						labels={statistics.data.map((course) => {
							return course.shortName
						})}
						values={
							showGrades
								? statistics.data.map((course) => {
										return course.averageGrade
								  })
								: statistics.data.map((course) => {
										return course.studentsNumber
								  })
						}
						width={300}
					/>
					<IconButton
						icon="chevron-right"
						onPress={() => setPageNumber(pageNumber + 1)}
						iconColor={COLORS.white}
						disabled={pageNumber === statistics.totalPages}
						theme={{ dark: true }}
					/>
				</HStack>
				{statistics.data.map((course) => (
					<BlueListAccordion
						id={course.id}
						title={course.shortName}
						onPress={() => {}}
						iconPositionOnRight={true}
					>
						<List.Item
							title="Average obtained grade"
							style={listStyles.listItem}
							titleStyle={{ color: COLORS.almostWhite }}
							right={(props) => (
								<Text style={{ color: COLORS.almostWhite }}>
									{course.averageGrade}
								</Text>
							)}
						/>
						<List.Item
							title="Number of students"
							style={listStyles.listItem}
							titleStyle={{ color: COLORS.almostWhite }}
							right={(props) => (
								<Text style={{ color: COLORS.almostWhite }}>
									{course.studentsNumber}
								</Text>
							)}
						/>
					</BlueListAccordion>
				))}
			</ScrollView>
		</BottomAppbarLayout>
	)
}

export default ProfessorStatistics
