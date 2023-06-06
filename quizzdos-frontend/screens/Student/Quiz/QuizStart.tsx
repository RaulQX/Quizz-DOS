import { Flex, HStack, VStack } from "@react-native-material/core"
import { useQuery } from "@tanstack/react-query"
import { fetchQuiz } from "Api/Student/QuizStart"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TextButton from "components/common/TextButton"
import TopTextInArch from "components/common/TopTextInArch"
import { QUIZ_STATUS } from "constants/Constants"
import useUser from "contexts/user/UserContext"
import AnimatedLottieView from "lottie-react-native"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Text } from "react-native"
import { Divider, Surface } from "react-native-paper"

interface StartQuiz {
	title: string
	status: number
	sectionName: string
	questionsNumber: number
	grade: number
	questions: StartQuestion[]
}

export interface StartQuestion {
	id: string
	prompt: string
	questionScore: number
	tipAllowed: boolean
	options: StartOption[]
}

interface StartOption {
	id: string
	text: string
	optionScore: number
}
const initialQuiz: StartQuiz = {
	title: "",
	status: 0,
	sectionName: "",
	questionsNumber: 0,
	grade: 0,
	questions: [],
}
const QuizStart = ({ route, navigation }: any) => {
	const { personId } = useUser()
	const { quizId } = route.params
	const [quiz, setQuiz] = useState<StartQuiz>(initialQuiz)

	useQuery(["quiz", quizId], () => fetchQuiz({ personId, quizId }), {
		onSuccess: (data) => setQuiz(data),
		onError: (error) => console.log(error),
	})

	return (
		<BottomAppbarLayout navigation={navigation}>
			<TopTextInArch firstLine="Quiz Time!" />

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
								{quiz.title}
							</Text>{" "}
							from{" "}
							<Text style={{ fontWeight: "bold" }}>
								{quiz.sectionName}
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
									{quiz.questionsNumber}
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
									{quiz.grade}/10
								</Text>
							</HStack>
						</Surface>
					</Flex>

					<TextButton
						onPress={() => {
							navigation.navigate("Quiz", {
								quizName: quiz.title,
								quizId: quizId,
								propsQuestions: quiz.questions,
							})
						}}
						text="Start Quiz!"
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
