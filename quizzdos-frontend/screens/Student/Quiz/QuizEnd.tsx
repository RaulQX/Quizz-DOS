import { VStack } from "@react-native-material/core"
import TextButton from "components/common/TextButton"
import AnimatedLottieView from "lottie-react-native"
import { COLORS } from "palette/colors"
import React from "react"
import { Dimensions, Text } from "react-native"
import { Surface } from "react-native-paper"
import { IQuestion } from "./Quiz"

interface QuizEndProps {
	navigation: any
	questions: IQuestion[]
	quizId: string
}

const QuizEnd = ({ questions, navigation, quizId }: QuizEndProps) => {
	const numberOfQuestionsAnswered = questions
		? questions.filter((question) => question.chosenOptions.length > 0)
				.length
		: 0

	return (
		<Surface
			style={{
				backgroundColor: COLORS.charcoal,
				width: "90%",
				height: "80%",
				alignSelf: "center",
				marginTop: Dimensions.get("window").height * 0.1 - 20,
				borderColor: COLORS.blue,
				borderWidth: 2,
				borderRadius: 20,
			}}
			elevation={2}
		>
			<VStack
				style={{ padding: 10, height: "100%" }}
				spacing={20}
				justify="between"
			>
				<VStack style={{ padding: 10 }} spacing={30}>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 15,
							textAlign: "center",
						}}
					>
						You are about to submit your answers for the quiz.
					</Text>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 15,
							textAlign: "center",
						}}
					>
						You have answered{" "}
						<Text style={{ color: COLORS.blue }}>
							{numberOfQuestionsAnswered}/
							{questions ? questions.length : 0}
						</Text>{" "}
						questions.
					</Text>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 15,
							textAlign: "center",
						}}
					>
						Please review your answers before submitting.
					</Text>
					<AnimatedLottieView
						source={require("assets/animations/checklist.json")}
						autoPlay
						loop
						speed={2.5}
						style={{ width: 200, height: 200, marginLeft: 10 }}
					/>
				</VStack>
				<TextButton
					text="Submit"
					onPress={() => {
						navigation.navigate("QuizResult", {
							questions: questions,
							quizId: quizId
						})
					}}
				/>
			</VStack>
		</Surface>
	)
}

export default QuizEnd
