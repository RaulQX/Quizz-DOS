import { Flex, HStack, VStack } from "@react-native-material/core"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native"
import { Button, Divider, TextInput } from "react-native-paper"
import AnimatedLottieView from "lottie-react-native"
import FormIntro from "components/common/FormIntro"
import FormEnd from "components/common/FormEnd"
import FormLayout from "components/common/FormLayout"
import useUser from "contexts/user/UserContext"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "Api/Auth/Login"
import ButtonModal from "components/common/ButtonModal"

const Login = ({ navigation }: any) => {
	const [loginCredential, setLoginCredential] = useState("")
	const [password, setPassword] = useState("")
	const [visible, setVisible] = useState(false)

	const [modalMessage, setModalMessage] = useState("")

	const { loginUser: loginUserInContext } = useUser()

	const loginMutation = useMutation({
		mutationFn: (data: any) => loginUser(data),
		onSuccess: (user: any) => {
			loginUserInContext(user).then(() => {
				if (!user.profileSetup) {
					navigation.navigate("FirstTimeSignIn")
					return
				}
				navigation.navigate("Home")
			})
		},
		onError: ({ response: { data } }) => {
			setModalMessage(data || "Something went wrong!")
			setVisible(true)
		},
	})

	const handleLogin = async () => {
		loginMutation.mutate({
			credentials: loginCredential,
			password,
		})
	}

	return (
		<>
			<FormLayout>
				<View key={0}>
					<FormIntro
						whiteText="Log"
						blueText="in"
						onPress={() => navigation.navigate("Welcome")}
					/>

					<VStack style={{ marginTop: 20 }}>
						<Text style={{ color: COLORS.gray, fontSize: 15 }}>
							Log in to be able to access awesome quizzes!
						</Text>
						<Divider style={{ marginVertical: 25 }} />
						<AnimatedLottieView
							source={require("@assets/animations/login_quiz.json")}
							autoPlay
							loop
							speed={2}
							style={{
								width: 250,
								height: 250,
								alignSelf: "center",
							}}
						/>
						<Divider style={{ marginVertical: 25 }} />

						<VStack
							style={{ marginBottom: 20, marginTop: 10 }}
							spacing={8}
						>
							<Text
								style={{
									color: COLORS.white,
									fontSize: 15,
									marginLeft: 10,
								}}
							>
								Email / Userame / Phone Number
							</Text>
							<TextInput
								mode="outlined"
								placeholder="Enter your login credential"
								style={{ backgroundColor: "transparent" }}
								theme={{
									roundness: 20,
									colors: { primary: COLORS.blue },
								}}
								textColor="white"
								inputMode="email"
								outlineColor={COLORS.gray}
								value={loginCredential}
								onChangeText={(text) => {
									setLoginCredential(text)
								}}
								keyboardType="email-address"
								autoCapitalize="none"
							/>
						</VStack>
						<VStack style={{ marginVertical: 20 }} spacing={10}>
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
								placeholder="Enter your password"
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
						<FormEnd
							buttonText="Login"
							buttonIcon="login"
							underButtonText="Don't have an account?"
							underButtonNavigationText="Sign up"
							onPress={() => handleLogin()}
							underButtonNavigation={() =>
								navigation.navigate("SignUp")
							}
						/>
					</VStack>
				</View>
			</FormLayout>
			<ButtonModal
				modalVisible={visible}
				setModalVisible={setVisible}
				modalTitle={"Error"}
				modalMessage={modalMessage}
				modalButtonText={"Okay"}
				onPress={() => setVisible(false)}
			/>
		</>
	)
}

export default Login
