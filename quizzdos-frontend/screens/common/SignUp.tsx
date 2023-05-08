import { Flex, VStack } from "@react-native-material/core"
import FormEnd from "components/common/FormEnd"
import FormIntro from "components/common/FormIntro"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { ScrollView, KeyboardAvoidingView, Text } from "react-native"
import { TextInput } from "react-native-paper"

const SignUp = ({ navigation }: any) => {
	const [mobileNumber, setMobileNumber] = useState("")
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position">
				<Flex direction="column">
					<VStack style={{ marginTop: 40, marginHorizontal: 25 }}>
						<FormIntro
							whiteText="Sign"
							blueText="Up"
							onPress={() => navigation.navigate("Welcome")}
						/>
						<Text
							style={{
								color: COLORS.gray,
								fontSize: 15,
								marginTop: 20,
							}}
						>
							Sign up to be able to access awesome quizzes!
						</Text>
						<VStack style={{ marginTop: 40 }} spacing={30}>
							<VStack spacing={8}>
								<Text
									style={{
										color: COLORS.white,
										fontSize: 15,
										marginLeft: 10,
									}}
								>
									Username
								</Text>
								<TextInput
									mode="outlined"
									placeholder="JohnDoe"
									style={{ backgroundColor: "transparent" }}
									theme={{
										roundness: 20,
										colors: { primary: COLORS.blue },
									}}
									textColor="white"
									inputMode="text"
									outlineColor={COLORS.gray}
									value={username}
									onChangeText={(text) => {
										setUsername(text)
									}}
									keyboardType="default"
									autoCapitalize="none"
								/>
							</VStack>
							<VStack spacing={8}>
								<Text
									style={{
										color: COLORS.white,
										fontSize: 15,
										marginLeft: 10,
									}}
								>
									Email
								</Text>
								<TextInput
									mode="outlined"
									placeholder="example@ex.com"
									style={{ backgroundColor: "transparent" }}
									theme={{
										roundness: 20,
										colors: { primary: COLORS.blue },
									}}
									textColor="white"
									inputMode="email"
									outlineColor={COLORS.gray}
									value={email}
									onChangeText={(text) => {
										setEmail(text)
									}}
									keyboardType="email-address"
									autoCapitalize="none"
								/>
							</VStack>
							<VStack spacing={8}>
								<Text
									style={{
										color: COLORS.white,
										fontSize: 15,
										marginLeft: 10,
									}}
								>
									Mobile Number
								</Text>
								<TextInput
									mode="outlined"
									placeholder="0712345678"
									style={{ backgroundColor: "transparent" }}
									theme={{
										roundness: 20,
										colors: { primary: COLORS.blue },
									}}
									textColor="white"
									inputMode="numeric"
									outlineColor={COLORS.gray}
									value={mobileNumber}
									onChangeText={(text) => {
										setMobileNumber(text)
									}}
									keyboardType="number-pad"
									autoCapitalize="none"
								/>
							</VStack>
							<VStack spacing={10}>
								<Text
									style={{
										color: COLORS.white,
										fontSize: 15,
										marginLeft: 10,
									}}
								>
									Password
								</Text>

								<TextInput
									mode="outlined"
									placeholder="Enter a strong password"
									style={{ backgroundColor: "transparent" }}
									theme={{
										roundness: 20,
										colors: { primary: COLORS.blue },
									}}
									textColor="white"
									outlineColor={COLORS.gray}
									onChangeText={(text) => {
										setPassword(text)
									}}
									value={password}
									autoCapitalize="none"
									secureTextEntry={true}
								/>
							</VStack>
						</VStack>
						<FormEnd
							buttonText="Sign Up"
							buttonIcon="account-plus-outline"
							underButtonText="Already have an account?"
							underButtonNavigationText="Sign in"
							onPress={() => navigation.navigate("Welcome")}
							underButtonNavigation={() =>
								navigation.navigate("Login")
							}
						/>
					</VStack>
				</Flex>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

export default SignUp
