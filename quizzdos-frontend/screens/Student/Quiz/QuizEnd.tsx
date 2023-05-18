import React, { useEffect, useState } from "react"
import { IQuestion } from "./Quiz"
import { Surface } from "react-native-paper"
import { COLORS } from "palette/colors"
import { Dimensions, Text } from "react-native"
import { VStack } from "@react-native-material/core"
import TextButton from "components/common/TextButton"
import AnimatedLottieView from "lottie-react-native"

interface QuizEndProps {
	questions: IQuestion[]
}

const QuizEnd = ({ questions }: QuizEndProps) => {
	console.log("QuizEnd.tsx: questions: ", questions)
	const numberOfQuestionsAnswered = questions.filter(
		(question) => question.chosenOptions.length > 0
	).length

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
							{numberOfQuestionsAnswered}/{questions.length}
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

				<TextButton text="Submit" onPress={() => {}} />
			</VStack>
		</Surface>
	)
}

export default QuizEnd
