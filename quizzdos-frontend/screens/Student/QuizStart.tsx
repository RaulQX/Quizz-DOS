import { Flex, HStack, VStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TextButton from "components/common/TextButton"
import { QUIZ_STATUS } from "constants/Constants"
import AnimatedLottieView from "lottie-react-native"
import { COLORS } from "palette/colors"
import React from "react"
import { View, Text } from "react-native"
import { Divider, Surface } from "react-native-paper"

const constProps = {
	quiz: {
		id: "01",
		title: "Quiz 1",
		status: QUIZ_STATUS.unopened,
		sectionName: "Section 1",
		questions: 7,
		grade: 0,
	},
}

interface IQuizStartProps {
	navigation: any
	quiz: {
		id: string
		title: string
		status: number
		sectionName: string
	}
}

const QuizStart = ({ navigation }: any) => {
	return (
		<BottomAppbarLayout navigation={navigation}>
			<Text
				style={{
					color: COLORS.white,
					fontSize: 27,
					textAlign: "center",
					marginTop: 40,
					fontWeight: "bold",
				}}
			>
				Quiz Time!
			</Text>
			<Surface
				style={{
					backgroundColor: COLORS.charcoal,
					width: "90%",
					height: "70%",
					alignSelf: "center",
					marginTop: 15,
					borderColor: COLORS.blue,
					borderWidth: 2,
					borderRadius: 20,
				}}
				elevation={2}
			>
				<VStack style={{ padding: 10 }}>
					<Flex>
						<Text
							style={{
								color: COLORS.white,
								fontSize: 15,
								textAlign: "center",
							}}
						>
							You are about to start{" "}
							<Text style={{ fontWeight: "bold" }}>
								{constProps.quiz.title}
							</Text>{" "}
							from{" "}
							<Text style={{ fontWeight: "bold" }}>
								{constProps.quiz.sectionName}
							</Text>
							.
						</Text>
						<AnimatedLottieView
							source={require("assets/animations/magnifyingGlass.json")}
							autoPlay
							loop
							style={{
								width: 100,
								height: 150,
								alignSelf: "center",
								marginLeft: 10,
							}}
						/>
						<Surface
							style={{
								backgroundColor: COLORS.charcoal,
								width: "80%",
								alignSelf: "center",
								borderRadius: 20,
								marginTop: 30,
								padding: 30,
								paddingTop: 20,
								borderWidth: 1,
								borderColor: COLORS.blue,
							}}
							elevation={2}
						>
							<Text
								style={{
									color: COLORS.white,
									fontSize: 15,
									textAlign: "center",
									fontWeight: "bold",
								}}
							>
								Statistics
							</Text>
							<Divider
								style={{
									backgroundColor: COLORS.blue,
									height: 1,
									marginVertical: 5,
								}}
							/>
							<HStack
								style={{
									justifyContent: "space-between",
									marginTop: 15,
									marginBottom: 20,
								}}
							>
								<Text
									style={{
										color: COLORS.white,
										fontSize: 15,
										textAlign: "center",
									}}
								>
									Questions
								</Text>
								<Text
									style={{
										color: COLORS.white,
										fontSize: 15,
										textAlign: "center",
									}}
								>
									{constProps.quiz.questions}
								</Text>
							</HStack>
							<HStack style={{ justifyContent: "space-between" }}>
								<Text
									style={{
										color: COLORS.white,
										fontSize: 15,
										textAlign: "center",
									}}
								>
									Grade
								</Text>
								<Text
									style={{
										color: COLORS.white,
										fontSize: 15,
										textAlign: "center",
									}}
								>
									{constProps.quiz.grade}/10
								</Text>
							</HStack>
						</Surface>
					</Flex>

					<TextButton
						onPress={() => {
							console.log("start quiz")
						}}
						text="Start Quizz!"
						style={{
							width: "70%",
							alignSelf: "center",
							marginTop: 90,
						}}
					/>
				</VStack>
			</Surface>
		</BottomAppbarLayout>
	)
}

export default QuizStart
