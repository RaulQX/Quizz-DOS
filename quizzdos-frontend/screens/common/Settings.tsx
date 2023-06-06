import { HStack, VStack } from "@react-native-material/core"
import { Mutation, useMutation, useQuery } from "@tanstack/react-query"
import { fetchSettings, updateSettings } from "Api/Common/Settings"
import BlueTextHStack from "components/common/BlueTextHStack"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TextButton from "components/common/TextButton"
import { listStyles } from "components/list/ListStyles"
import { GENDERS } from "constants/Constants"
import useUser from "contexts/user/UserContext"
import AnimatedLottieView from "lottie-react-native"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { List } from "react-native-paper"

const studentSettingsConstProps = {
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@doe.com",
	username: "jd123",
	phoneNumber: "1234567890",
	role: 0,
	gender: 1,
}

const Settings = ({ navigation }: any) => {
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

	const [username, setUsername] = useState<string>(
		studentSettingsConstProps.username
	)
	const [phoneNumber, setPhoneNumber] = useState<string>(
		studentSettingsConstProps.phoneNumber
	)
	const [email, setEmail] = useState<string>(studentSettingsConstProps.email)
	const [role, setRole] = useState<number>(studentSettingsConstProps.role)
	const { personId } = useUser()

	const updateSettingsMutation = useMutation({
		mutationFn: (data: any) => updateSettings(data),
		onSuccess: (_: any) => {
			navigation.navigate("Home")
		},
		onError: ({ response: { data } }) => {
			console.log(data)
		},
	})

	useQuery(["settings", personId], () => fetchSettings(personId), {
		onSuccess: (data) => {
			console.log("data", data)
			setFirstName(data.firstName)
			setLastName(data.lastName)
			setUsername(data.username)
			setPhoneNumber(data.phoneNumber)
			setEmail(data.email)
			setGenderValue(data.gender)
			setRole(data.role)
		},
		onError: (error) => console.log(error),
	})

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
				<HStack justify="around" style={{ marginTop: 30 }} spacing={5}>
					<AnimatedLottieView
						autoPlay
						loop
						source={require("assets/animations/settings.json")}
						style={{ height: 150, width: 150, marginRight: 30 }}
					/>
				</HStack>
			</View>
			<VStack
				style={{ marginHorizontal: 25, marginTop: 30 }}
				spacing={20}
			>
				<BlueTextHStack text="First Name">
					<TextInput
						style={styles.textInput}
						value={firstName}
						onChangeText={(t) => setFirstName(t)}
						autoCapitalize="words"
						textAlign="right"
					/>
				</BlueTextHStack>
				<BlueTextHStack text="Last Name">
					<TextInput
						style={styles.textInput}
						value={lastName}
						onChangeText={(t) => setLastName(t)}
						autoCapitalize="words"
						textAlign="right"
					/>
				</BlueTextHStack>
				<BlueTextHStack text="Username">
					<Text style={{ color: COLORS.gray, fontSize: 20 }}>
						<Text>{username}</Text>
					</Text>
				</BlueTextHStack>
				<BlueTextHStack text="Email">
					<Text style={{ color: COLORS.gray, fontSize: 20 }}>
						<Text>{email}</Text>
					</Text>
				</BlueTextHStack>
				<BlueTextHStack text="Phone Number">
					<Text style={{ color: COLORS.gray, fontSize: 20 }}>
						<Text>{phoneNumber}</Text>
					</Text>
				</BlueTextHStack>
				<BlueTextHStack text="Role">
					<Text style={{ color: COLORS.gray, fontSize: 20 }}>
						<Text>{roleMap.get(role)}</Text>
					</Text>
				</BlueTextHStack>

				<BlueTextHStack text="Gender" marginTop={10}>
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
				</BlueTextHStack>
				<TextButton
					text="Save"
					onPress={() => {
						updateSettingsMutation.mutate({
							personId,
							firstName,
							lastName,
							gender: genderValue,
						})
					}}
				/>
				<TextButton
					text="Logout"
					onPress={() => navigation.navigate("Login")}
				/>
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

export default Settings
