import React from "react"
import { View } from "react-native"
import AnimatedLottieView from "lottie-react-native"
import Logo from "components/common/Logo"
import { VStack } from "react-native-flex-layout"
import TextButton from "components/common/TextButton"

const Welcome = ({ navigation }: any) => {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<Logo />
			<AnimatedLottieView
				source={require("@assets/animations/quiz.json")}
				autoPlay
				loop={true}
				style={{
					width: 300,
					height: 300,
				}}
			/>

			<VStack
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "stretch",
					width: "85%",
				}}
				spacing={10}
			>
				<TextButton
					text="Login"
					icon="login"
					onPress={() => navigation.navigate("Login")}
				/>
				<TextButton
					text="Sign Up"
					icon="account-plus"
					onPress={() => navigation.navigate("SignUp")}
				/>
			</VStack>
		</View>
	)
}

export default Welcome
