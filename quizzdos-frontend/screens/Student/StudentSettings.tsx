import { HStack, VStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TextButton from "components/common/TextButton"
import { listStyles } from "components/list/ListStyles"
import { GENDERS } from "constants/Constants"
import AnimatedLottieView from "lottie-react-native"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Text, View, StyleSheet, TextInput } from "react-native"
import { Divider } from "react-native-flex-layout"
import { Avatar, List } from "react-native-paper"

const studentSettingsConstProps = {
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@doe.com",
	role: 0,
	gender: 1,
}

const StudentSettings = ({ navigation }: any) => {
	const [genderVisible, setGenderVisible] = useState(false)
	const [genderValue, setGenderValue] = useState<number>(
		studentSettingsConstProps.gender
	)
	const [firstName, setFirstName] = useState<string>(
		studentSettingsConstProps.firstName
	)
	const [lastName, setLastName] = useState<string>(
		studentSettingsConstProps.lastName
	)
	const [email, setEmail] = useState<string>(studentSettingsConstProps.email)
	const [role, setRole] = useState<number>(studentSettingsConstProps.role)

	const genderMap = new Map<number, string>([
		[0, "Not Specified"],
		[1, "Male"],
		[2, "Female"],
	])

	const roleMap = new Map<number, string>([
		[0, "Student"],
		[1, "Professor"],
		[2, "Admin"],
	])

	return (
		<BottomAppbarLayout navigation={navigation}>
			<View>
				<HStack justify="around" style={{ marginTop: 40 }} spacing={5}>
					<AnimatedLottieView
						autoPlay
						loop
						source={require("assets/animations/settings.json")}
						style={{ height: 150, width: 150, marginRight: 30 }}
					/>
				</HStack>
			</View>
			<VStack
				style={{ marginHorizontal: 25, marginTop: 40 }}
				spacing={20}
			>
				<HStack justify="between">
					<Text style={{ color: COLORS.blue, fontSize: 20 }}>
						<Text>First Name</Text>
					</Text>
					<TextInput
						style={styles.textInput}
						value={firstName}
						onChangeText={(t) => setFirstName(t)}
						autoCapitalize="words"
						textAlign="right"
					/>
				</HStack>
				<Divider />
				<HStack justify="between">
					<Text style={{ color: COLORS.blue, fontSize: 20 }}>
						<Text>Last Name</Text>
					</Text>
					<TextInput
						style={styles.textInput}
						value={lastName}
						onChangeText={(t) => setLastName(t)}
						autoCapitalize="words"
						textAlign="right"
					/>
				</HStack>
				<Divider />
				<HStack justify="between">
					<Text style={{ color: COLORS.blue, fontSize: 20 }}>
						<Text>Email</Text>
					</Text>
					<TextInput
						style={styles.textInput}
						value={email}
						onChangeText={(t) => setLastName(email)}
						autoCapitalize="none"
						textAlign="right"
						inputMode="email"
					/>
				</HStack>
				<Divider />
				<HStack justify="between">
					<Text style={{ color: COLORS.blue, fontSize: 20 }}>
						<Text>Role</Text>
					</Text>
					<Text style={{ color: COLORS.gray, fontSize: 20 }}>
						<Text>
							{roleMap.get(studentSettingsConstProps.role)}
						</Text>
					</Text>
				</HStack>
				<Divider />
				<HStack justify="between">
					<Text
						style={{
							color: COLORS.blue,
							fontSize: 20,
							marginTop: 5,
						}}
					>
						<Text>Gender</Text>
					</Text>
					<List.Accordion
						title={genderMap.get(genderValue)}
						style={{
							backgroundColor: COLORS.dark,
							width: 150,
							padding: 0,
							margin: 0,
						}}
						left={(props) => (
							<List.Icon
								{...props}
								icon="chevron-down"
								color={COLORS.white}
							/>
						)}
						right={(props) => (
							<List.Icon
								{...props}
								icon="chevron-down"
								style={{ width: 0, height: 0 }}
							/>
						)}
						titleStyle={[
							listStyles.listAccordianTitle,
							{
								alignSelf: "flex-end",
								color: COLORS.white,
								fontWeight: "normal",
							},
						]}
						expanded={genderVisible}
						onPress={() => {
							setGenderVisible(!genderVisible)
						}}
					>
						<List.Item
							title={"Male"}
							onPress={() => {
								setGenderVisible(!genderVisible)
								setGenderValue(GENDERS.male)
							}}
							style={listStyles.listItem}
							titleStyle={listStyles.listItemTitle}
						/>
						<List.Item
							title={"Female"}
							onPress={() => {
								setGenderVisible(!genderVisible)
								setGenderValue(GENDERS.female)
							}}
							style={listStyles.listItem}
							titleStyle={listStyles.listItemTitle}
						/>
						<List.Item
							title={"Not Specified"}
							onPress={() => {
								setGenderVisible(!genderVisible)
								setGenderValue(GENDERS.notSpecified)
							}}
							style={listStyles.listItem}
							titleStyle={listStyles.listItemTitle}
						/>
					</List.Accordion>
				</HStack>
				<Divider />
				<TextButton text="Save" onPress={() => {}} />
				<TextButton text="Logout" onPress={() => {}} />
			</VStack>
		</BottomAppbarLayout>
	)
}

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: COLORS.dark,
		color: COLORS.white,
		width: "50%",
		fontSize: 20,
	},
})

export default StudentSettings
