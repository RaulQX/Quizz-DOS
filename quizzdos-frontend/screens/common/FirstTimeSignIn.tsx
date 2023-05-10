import { HStack, VStack } from "@react-native-material/core"
import FormLayout from "components/common/FormLayout"
import TextButton from "components/common/TextButton"
import AnimatedLottieView from "lottie-react-native"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Text } from "react-native"
import { Divider, RadioButton, TextInput } from "react-native-paper"

const FirstTimeSignIn = ({ username }: any) => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [gender, setGender] = useState(0)
	return (
		<FormLayout>
			<VStack spacing={8}>
				<AnimatedLottieView
					source={require("@assets/animations/first_time_sign_in_data.json")}
					autoPlay
					loop={true}
					style={{ width: 300, height: 300, alignSelf: "center" }}
				/>
				<Text
					style={{
						fontSize: 25,
						color: COLORS.white,
					}}
				>
					Hi{" "}
					<Text style={{ color: COLORS.blue }}>
						{username || "user"}
					</Text>
					, it looks like it's the first time you're signing in.
				</Text>
				<Divider />
				<Text style={{ fontSize: 15, color: COLORS.white }}>
					We will gather some more information to better know you.
				</Text>
				<HStack justify="around">
					<TextInput
						mode="outlined"
						placeholder="First Name"
						style={{ backgroundColor: "transparent", width: "45%" }}
						theme={{
							roundness: 20,
							colors: { primary: COLORS.blue },
						}}
						textColor="white"
						inputMode="text"
						outlineColor={COLORS.gray}
						value={firstName}
						onChangeText={(text) => {
							setFirstName(text)
						}}
						keyboardType="default"
						autoCapitalize="words"
					/>
					<TextInput
						mode="outlined"
						placeholder="Last Name"
						style={{ backgroundColor: "transparent", width: "45%" }}
						theme={{
							roundness: 20,
							colors: { primary: COLORS.blue },
						}}
						textColor="white"
						inputMode="text"
						outlineColor={COLORS.gray}
						value={lastName}
						onChangeText={(text) => {
							setLastName(text)
						}}
						keyboardType="default"
						autoCapitalize="words"
					/>
				</HStack>
				<HStack style={{ marginTop: 10 }} justify="around">
					<Text
						style={{
							color: COLORS.white,
							alignSelf: "center",
							fontSize: 20,
						}}
					>
						Gender
					</Text>
					<VStack>
						<RadioButton.Group
							value={gender.toString()}
							onValueChange={(value) => {
								setGender(parseInt(value))
							}}
						>
							<RadioButton.Item
								labelStyle={{
									color: COLORS.white,
									marginRight: 15,
								}}
								label="Not Specified"
								value="0"
								color={COLORS.blue}
							/>

							<RadioButton.Item
								labelStyle={{
									color: COLORS.white,
									marginRight: 15,
								}}
								label="Male"
								value="1"
								color={COLORS.blue}
							/>
							<RadioButton.Item
								labelStyle={{
									color: COLORS.white,
									marginRight: 15,
								}}
								label="Female"
								value="2"
								color={COLORS.blue}
							/>
						</RadioButton.Group>
					</VStack>
				</HStack>
				<TextButton
					text="Submit"
					onPress={() => console.log("du-ma la home")}
				/>
			</VStack>
		</FormLayout>
	)
}

export default FirstTimeSignIn
