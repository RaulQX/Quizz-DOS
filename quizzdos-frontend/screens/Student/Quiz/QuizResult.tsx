import { VStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TopTextInArch from "components/common/TopTextInArch"
import AnimatedLottieView from "lottie-react-native"
import { COLORS } from "palette/colors"
import React from "react"
import { Text } from "react-native"
import { IQuestion } from "./Quiz"

interface QuizResult {
	quizGrade: number
	correctQuestions: number
	totalQuestions: number
}
function calculateQuizResult(questions: IQuestion[]): QuizResult {
	let totalScore = 0
	let correctQuestions = 0

	for (const question of questions) {
		const chosenOptions = question.chosenOptions
		const questionScore = question.questionScore

		if (chosenOptions.length === question.options.length) continue

		let scorePercentage = 0
		let wrongOptions = 0

		for (const option of question.options) {
			const isOptionSelected = chosenOptions.includes(option.id)
			const isOptionCorrect = option.scorePercentage > 0

			if (isOptionSelected && isOptionCorrect) {
				scorePercentage += option.scorePercentage
			}
			if (isOptionSelected && !isOptionCorrect) {
				wrongOptions++
			}
		}
		if (wrongOptions > 0) scorePercentage /= 2 * wrongOptions

		const questionMarks = (questionScore * scorePercentage) / 100
		totalScore += questionMarks

		if (scorePercentage === 100) {
			correctQuestions++
		}
	}

	return {
		quizGrade: totalScore,
		correctQuestions,
		totalQuestions: questions.length,
	}
}

const QuizResult = ({ route, navigation }: any) => {
	const { questions } = route.params
	const result = calculateQuizResult(questions)

	return (
		<BottomAppbarLayout navigation={navigation}>
			<TopTextInArch
				firstLine="Quiz Result"
				secondLine={
					result.quizGrade >= 4.5
						? "Congratulations"
						: "Next time for sure"
				}
			/>
			<VStack content="center" items="center">
				{result.quizGrade >= 4.5 ? (
					<Text
						style={{
							color: COLORS.white,
							fontSize: 20,
							textAlign: "center",
						}}
					>
						You have passed the quiz
					</Text>
				) : (
					<Text
						style={{
							color: COLORS.white,
							fontSize: 20,
							textAlign: "center",
						}}
					>
						You have failed the quiz
					</Text>
				)}
				{result.quizGrade >= 4.5 ? (
					<AnimatedLottieView
						source={require("assets/animations/happyResult.json")}
						autoPlay
						loop
						style={{
							width: 200,
							height: 200,
							alignSelf: "center",
							marginLeft: 10,
						}}
					/>
				) : (
					<AnimatedLottieView
						source={require("assets/animations/badResult.json")}
						autoPlay
						loop
						style={{
							width: 200,
							height: 200,
							alignSelf: "center",
							marginLeft: 10,
						}}
					/>
				)}

				<Text
					style={{
						color: COLORS.white,
						fontSize: 15,
						textAlign: "center",
					}}
				>
					You have scored
				</Text>
				<Text
					style={{
						color: COLORS.blue,
						fontSize: 15,
						textAlign: "center",
						fontWeight: "bold",
					}}
				>
					{result.quizGrade}
					<Text style={{ color: COLORS.white }}> / </Text>10
				</Text>
				<Text
					style={{
						color: COLORS.white,
						fontSize: 15,
						textAlign: "center",
						marginTop: 30,
					}}
				>
					You have answered correctly{" "}
					<Text style={{ fontWeight: "bold", color: COLORS.blue }}>
						{result.correctQuestions}
					</Text>{" "}
					/
					<Text style={{ fontWeight: "bold", color: COLORS.blue }}>
						{" "}
						{result.totalQuestions}{" "}
					</Text>
					questions.
				</Text>
			</VStack>
		</BottomAppbarLayout>
	)
}

export default QuizResult
