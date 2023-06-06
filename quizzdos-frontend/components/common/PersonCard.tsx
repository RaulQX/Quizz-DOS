import { HStack, VStack } from "@react-native-material/core"
import { ROLES } from "constants/Constants"
import { COLORS } from "palette/colors"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { IconButton, Banner } from "react-native-paper"
import { Text } from "react-native"
import { useMutation } from "@tanstack/react-query"
import { IUpdateRole, updatePersonRole } from "Api/Admin/PeopleCard"

interface IPersonCard {
	id: string
	fullName: string
	role: number
	lastEntry: boolean
	firstEntry: boolean
}

const PersonCard = ({
	fullName,
	role,
	lastEntry,
	firstEntry,
	id,
}: IPersonCard) => {
	const [visible, setVisible] = useState(false)
	const lineHeight = 55

	const [newRole, setNewRole] = useState<number>(role)

	const updateMutation = useMutation({
		mutationFn: ({ personId, role }: IUpdateRole) =>
			updatePersonRole({ personId, role }),
		onSuccess: (data) => {
			setNewRole(data.role)
		},
		onError: (error) => {
			console.log(error)
		},
	})

	return (
		<>
			<HStack
				style={{
					backgroundColor: COLORS.charcoal,
					width: "100%",
					padding: 15,
					borderRadius: 10,
					height: 75,
				}}
				justify="between"
			>
				<View>
					<View
						style={{
							overflow: "visible",
							alignItems: "center",
							width: 5,
						}}
					>
						{!firstEntry && !visible && (
							<View
								style={{
									height: lineHeight,
									borderWidth: 0.5,
									position: "absolute",
									top: !visible ? -23 : -23,
									borderColor: COLORS.blue,
									backgroundColor: COLORS.blue,
								}}
							/>
						)}

						<View
							style={{
								borderWidth: 0.5,
								borderRadius: 100,
								width: 15,
								height: 15,
								backgroundColor: COLORS.blue,
								position: "absolute",
								top: 18,
								borderColor: COLORS.blue,
							}}
						/>

						{!lastEntry && !visible && (
							<View
								style={{
									height: lineHeight,
									borderWidth: 0.5,
									position: "absolute",
									bottom: -78,
									borderColor: COLORS.blue,
									backgroundColor: COLORS.blue,
								}}
							/>
						)}
					</View>

					<VStack style={{ marginLeft: 25 }}>
						<Text
							style={{
								color: COLORS.white,
								fontSize: 20,
								fontWeight: "600",
							}}
						>
							{fullName}
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
								{newRole === ROLES.admin
									? "Admin"
									: newRole === ROLES.professor
									? "Professor"
									: "Student"}
							</Text>
						</HStack>
					</VStack>
				</View>
				<IconButton
					icon="chevron-down"
					iconColor={COLORS.white}
					size={30}
					style={{ alignSelf: "center" }}
					onPress={() => {
						setVisible(!visible)
					}}
				/>
			</HStack>
			<Banner
				visible={visible}
				actions={[
					{
						label: "Student",
						onPress: () => {
							updateMutation.mutate({
								personId: id,
								role: ROLES.student,
							})
							setVisible(false)
						},
					},
					{
						label: "Professor",
						onPress: () => {
							updateMutation.mutate({
								personId: id,
								role: ROLES.professor,
							})
							setVisible(false)
						},
					},
					{
						label: "Admin",
						onPress: () => {
							updateMutation.mutate({
								personId: id,
								role: ROLES.admin,
							})
							setVisible(false)
						},
					},
				]}
				style={{
					width: "90%",
					alignSelf: "flex-end",
					backgroundColor: COLORS.otherDark,
					marginBottom: 5,
					marginTop: 1,
					borderRadius: 10,
				}}
				theme={{
					colors: {
						surface: COLORS.charcoal,
						onSurface: COLORS.white,
						text: COLORS.white,
						primary: COLORS.blue,
						placeholder: COLORS.white,
						accent: COLORS.blue,
						backdrop: COLORS.charcoal,
					},
				}}
			>
				<Text style={{ color: COLORS.white }}>
					Choose role for {fullName}
				</Text>
			</Banner>
		</>
	)
}

export default PersonCard
