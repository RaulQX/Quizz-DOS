import { Flex, HStack, VStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import useUser from "contexts/user/UserContext"
import { COLORS } from "palette/colors"
import React from "react"
import { Text } from "react-native"
import { Avatar } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const constProps = {
	totalUsers: 20,
	totalProfessors: 5,
	totalStudents: 14,
	totalAdmins: 1,
	totalCourses: 10,
	toatlQuizzes: 50,
	createdMostCourses: "El Prof",
	mostQuizzesSolved: "El Studento",
}

const DashboardItem = ({ title, value }: { title: string; value: string }) => {
	return (
		<Flex
			direction="column"
			style={{
				backgroundColor: COLORS.charcoal,
				width: "45%",
				padding: 15,
				borderRadius: 10,
				alignItems: "center",
				marginBottom: 15,
			}}
		>
			<Text
				style={{ color: COLORS.white, fontSize: 20, fontWeight: "600" }}
			>
				{title}
			</Text>
			<HStack>
				<Text
					style={{
						color: COLORS.blue,
						fontSize: 20,
						fontWeight: "600",
						textAlign: "right",
					}}
				>
					{value}
				</Text>
			</HStack>
		</Flex>
	)
}

const AdminHome = ({ navigation }: any) => {
	const { firstName, lastName } = useUser()
	return (
		<BottomAppbarLayout navigation={navigation}>
			<Flex>
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
						Dashboard
					</Text>
					<Avatar.Icon
						size={40}
						icon="account"
						color={COLORS.white}
						style={{
							marginRight: 10,
							backgroundColor: COLORS.blue,
						}}
					/>
				</HStack>
				<Text
					style={{
						color: COLORS.white,
						fontSize: 20,
						fontWeight: "600",
						marginLeft: 20,
						marginTop: 10,
					}}
				>
					Welcome,{" "}
					<Text
						style={{
							color: COLORS.blue,
						}}
					>
						{firstName + " " + lastName}
					</Text>
				</Text>
				<VStack style={{ marginTop: 10, padding: 15 }} spacing={7}>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 22,
							fontWeight: "600",
							alignSelf: "center",
						}}
					>
						Users
					</Text>
					<HStack justify="around" wrap={"wrap"}>
						<DashboardItem
							title="Users"
							value={constProps.totalUsers.toString()}
						/>
						<DashboardItem
							title="Professors"
							value={constProps.totalProfessors.toString()}
						/>
						<DashboardItem
							title="Students"
							value={constProps.totalStudents.toString()}
						/>
						<DashboardItem
							title="Admins"
							value={constProps.totalAdmins.toString()}
						/>
					</HStack>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 22,
							fontWeight: "600",
							alignSelf: "center",
						}}
					>
						Courses
					</Text>
					<HStack justify="around" wrap={"wrap"}>
						<DashboardItem
							title="Courses"
							value={constProps.totalCourses.toString()}
						/>
						<DashboardItem
							title="Most Created"
							value={constProps.createdMostCourses}
						/>
					</HStack>

					<Text
						style={{
							color: COLORS.white,
							fontSize: 22,
							fontWeight: "600",
							alignSelf: "center",
						}}
					>
						Quizzes
					</Text>
					<HStack justify="around" wrap={"wrap"}>
						<DashboardItem
							title="Quizzes"
							value={constProps.toatlQuizzes.toString()}
						/>
						<DashboardItem
							title="Most Solved"
							value={constProps.mostQuizzesSolved}
						/>
					</HStack>
				</VStack>
			</Flex>
		</BottomAppbarLayout>
	)
}

export default AdminHome
