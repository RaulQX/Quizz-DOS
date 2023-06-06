import { Pressable, VStack } from "@react-native-material/core"
import { COLORS } from "palette/colors"
import React from "react"
import { Text } from "react-native"
import { IQuestion } from "./Quiz"

interface QuizQuestionsProps {
	question: IQuestion
	handleQuestionAnswer: (questionId: string, optionId: string) => void
}

const QuizQuestion = ({
	question,
	handleQuestionAnswer,
}: QuizQuestionsProps) => {
	const chosenOptions = question.chosenOptions || [] 

	return (
		<VStack>
			<Text
				style={{
					fontSize: 20,
					textAlign: "center",
					color: COLORS.white,
					marginTop: 20,
					fontWeight: "600",
				}}
			>
				{question.prompt}
			</Text>

			<VStack spacing={20} style={{ marginTop: 40 }}>
				{question.options.map((option: any) => {
					return (
						<Pressable
							key={option.id}
							style={{
								backgroundColor: chosenOptions.includes(
									option.id
								)
									? COLORS.blue
									: COLORS.white,
								borderRadius: 10,
								width: 300,
								height: 50,
								justifyContent: "center",
								alignItems: "center",
								alignSelf: "center",
							}}
							onPress={() => {
								handleQuestionAnswer(question.id, option.id)
							}}
						>
							<Text
								style={{
									fontSize: 20,
									textAlign: "center",
									color: COLORS.charcoal,
									fontWeight: "600",
								}}
							>
								{option.text}
							</Text>
						</Pressable>
					)
				})}
			</VStack>
		</VStack>
	)
}

export default QuizQuestion
