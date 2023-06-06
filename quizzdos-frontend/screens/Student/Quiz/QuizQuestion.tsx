import { Pressable, VStack } from "@react-native-material/core"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Text } from "react-native"
import { IQuestion } from "./Quiz"
import { IconButton } from "react-native-paper"
import ButtonModal from "components/common/ButtonModal"

interface QuizQuestionsProps {
	question: IQuestion
	handleQuestionAnswer: (questionId: string, optionId: string) => void
}

const QuizQuestion = ({
	question,
	handleQuestionAnswer,
}: QuizQuestionsProps) => {
	const chosenOptions = question.chosenOptions || []
	const [visible, setVisible] = useState(false)
	const [modalMessage, setModalMessage] = useState(
		"300 de cuvinte sa avem saa stim sa avem zile pe lume uzzy ytea bla bla bdaskjqwoi "
	)

	return (
		<VStack>
			{question.tipAllowed && (
				<IconButton
					icon="lightbulb-on-outline"
					iconColor={COLORS.almostWhite}
					style={{ alignSelf: "flex-end" }}
					onPress={() => {
						setVisible(true)
					}}
				/>
			)}
			<Text
				style={{
					fontSize: 20,
					textAlign: "center",
					color: COLORS.white,
					marginTop: question.tipAllowed ? 0 : 20,
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
			<ButtonModal
				modalVisible={visible}
				setModalVisible={setVisible}
				modalTitle={"Hint"}
				modalMessage={modalMessage}
				modalButtonText={"Okay"}
				onPress={() => setVisible(false)}
			/>
		</VStack>
	)
}

export default QuizQuestion
