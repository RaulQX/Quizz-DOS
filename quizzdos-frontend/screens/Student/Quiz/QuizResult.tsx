import { VStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TopTextInArch from "components/common/TopTextInArch"
import AnimatedLottieView from "lottie-react-native"
import { COLORS } from "palette/colors"
import React from "react"
import { Text } from "react-native"
const constProps = {
	result: {
		quizGrade: 10,
		correctQuestions: 3,
		totalQuestions: 3,
	},
}

const QuizResult = ({ navigation }: any) => {
	return (
		<BottomAppbarLayout navigation={navigation}>
			<TopTextInArch
				firstLine="Quiz Result"
				secondLine={
					constProps.result.quizGrade >= 4.5
						? "Congratulations"
						: "Next time for sure"
				}
			/>
			<VStack content="center" items="center">
				{constProps.result.quizGrade >= 4.5 ? (
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
				{constProps.result.quizGrade >= 4.5 ? (
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
					{constProps.result.quizGrade}
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
						{constProps.result.correctQuestions}
					</Text>{" "}
					/
					<Text style={{ fontWeight: "bold", color: COLORS.blue }}>
						{" "}
						{constProps.result.totalQuestions}{" "}
					</Text>
					questions.
				</Text>
			</VStack>
		</BottomAppbarLayout>
	)
}

export default QuizResult
