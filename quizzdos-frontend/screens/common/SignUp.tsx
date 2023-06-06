import { Flex, VStack } from "@react-native-material/core"
import { useMutation } from "@tanstack/react-query"
import { findFirstError, registerUser } from "Api/Auth/Register"
import ButtonModal from "components/common/ButtonModal"
import FormEnd from "components/common/FormEnd"
import FormIntro from "components/common/FormIntro"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { KeyboardAvoidingView, ScrollView, Text } from "react-native"
import { Divider, TextInput } from "react-native-paper"

const SignUp = ({ navigation }: any) => {
	const [mobileNumber, setMobileNumber] = useState("")
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [registrationSuccessful, setRegistrationSuccessful] = useState(false)

	const [modalVisible, setModalVisible] = useState(false)
	const [modalTitle, setModalTitle] = useState("")
	const [modalMessage, setModalMessage] = useState("")

	const reqisterUserMutation = useMutation({
		mutationFn: (data: any) => registerUser(data),
		onSuccess: (_: any) => {
			setModalTitle("Success")
			setModalMessage("You have successfully registered!")
			setRegistrationSuccessful(true)
			setModalVisible(true)
		},
		onError: ({ response: { data } }) => {
			setModalTitle("Error")
			setModalMessage(findFirstError(data) || "Something went wrong!")
			setRegistrationSuccessful(false)
			setModalVisible(true)
		},
		onSettled: () => {
			setUsername("")
			setEmail("")
			setPassword("")
			setMobileNumber("")
		},
	})

	function onSubmit() {
		reqisterUserMutation.mutate({
			username,
			email,
			phoneNumber: mobileNumber,
			password,
		})
	}

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
						<Divider style={{marginTop: 10}}/>
						<VStack style={{ marginTop: 70 }} spacing={15}>
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
										setUsername(
											text.replace(/[^a-zA-Z0-9._]/g, "")
										)
									}}
									keyboardType="default"
									autoCapitalize="none"
									maxLength={50}
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
									maxLength={100}
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
										setMobileNumber(
											text.replace(/[^0-9]/g, "")
										)
									}}
									keyboardType="number-pad"
									autoCapitalize="none"
									maxLength={10}
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
									maxLength={50}
								/>
							</VStack>
						</VStack>
						<FormEnd
							buttonText="Sign Up"
							buttonIcon="account-plus-outline"
							underButtonText="Already have an account?"
							underButtonNavigationText="Sign in"
							onPress={() => onSubmit()}
							underButtonNavigation={() =>
								navigation.navigate("Login")
							}
						/>
					</VStack>
				</Flex>
				<ButtonModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					modalTitle={modalTitle}
					modalMessage={modalMessage}
					modalButtonText={
						registrationSuccessful ? "Login" : "Try Again"
					}
					onPress={() => {
						setModalVisible(false)
						registrationSuccessful && navigation.navigate("Login")
					}}
				/>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

export default SignUp
