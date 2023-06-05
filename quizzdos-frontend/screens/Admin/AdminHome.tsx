import { Flex, HStack, VStack } from "@react-native-material/core"
import { useQuery } from "@tanstack/react-query"
import { fetchDashboard } from "Api/Admin/AdminHome"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import useUser from "contexts/user/UserContext"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Text } from "react-native"
import { Avatar } from "react-native-paper"

interface IDashboardItems {
	totalUsers: number
	totalProfessors: number
	totalStudents: number
	totalAdmins: number
	totalCourses: number
	totalQuizzes: number
	createdMostCourses: string
	mostQuizzesSolved: string
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
	const [dashboardItems, setDashboardItems] = useState<IDashboardItems>({
		totalUsers: 0,
		totalProfessors: 0,
		totalStudents: 0,
		totalAdmins: 0,
		totalCourses: 0,
		totalQuizzes: 0,
		createdMostCourses: "",
		mostQuizzesSolved: "",
	})

	useQuery(["dashboard", dashboardItems], () => fetchDashboard(), {
		onSuccess: (data) => setDashboardItems(data),
		onError: (error) => console.log(error),
	})

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
							value={dashboardItems.totalUsers.toString()}
						/>
						<DashboardItem
							title="Professors"
							value={dashboardItems.totalProfessors.toString()}
						/>
						<DashboardItem
							title="Students"
							value={dashboardItems.totalStudents.toString()}
						/>
						<DashboardItem
							title="Admins"
							value={dashboardItems.totalAdmins.toString()}
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
							value={dashboardItems.totalCourses.toString()}
						/>
						<DashboardItem
							title="Most Created"
							value={dashboardItems.createdMostCourses}
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
							value={dashboardItems.totalQuizzes.toString()}
						/>
						<DashboardItem
							title="Most Solved"
							value={dashboardItems.mostQuizzesSolved}
						/>
					</HStack>
				</VStack>
			</Flex>
		</BottomAppbarLayout>
	)
}

export default AdminHome
