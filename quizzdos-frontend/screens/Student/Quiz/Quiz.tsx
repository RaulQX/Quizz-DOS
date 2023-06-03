import { VStack, Flex } from "@react-native-material/core"
import PaginatedHorizontalList from "components/common/PaginatedHorizontalList"
import { COLORS } from "palette/colors"
import React, { useEffect, useState } from "react"
import QuizQuestion from "./QuizQuestion"
import QuizEnd from "./QuizEnd"
import TopTextInArch from "components/common/TopTextInArch"
import { StartQuestion } from "./QuizStart"

export interface IQuestion {
	id: string
	prompt: string
	questionScore: number
	tipAllowed: boolean
	options: IOption[]
	chosenOptions: string[]
}

interface IOption {
	id: string
	text: string
	scorePercentage: number
}

const Quiz = ({ route, navigation }: any) => {
	const { quizName, propsQuestions, quizId } = route.params

	const [refresh, setRefresh] = useState(false)
	const [questions, setQuestions] = useState<IQuestion[]>(
		propsQuestions.map((question: StartQuestion) => ({
			...question,
			chosenOptions: [],
		}))
	)

	const handleQuestionAnswer = (questionId: string, optionId: string) => {
		const newQuestions = questions.map((question: IQuestion) => {
			if (question.id === questionId) {
				const newChosenOptions = question.chosenOptions
					? [...question.chosenOptions]
					: []
				const optionIndex = newChosenOptions.indexOf(optionId)

				if (optionIndex > -1) {
					newChosenOptions.splice(optionIndex, 1)
				} else {
					newChosenOptions.push(optionId)
				}

				return { ...question, chosenOptions: newChosenOptions }
			}

			return question
		})

		setQuestions(newQuestions)
		setRefresh(!refresh)
	}

	return (
		<VStack justify="between" style={{ height: "100%" }}>
			<TopTextInArch
				firstLine={quizName}
				secondLine={questions.length + " questions"}
			/>

			<PaginatedHorizontalList
				navItems={[
					...questions.map(() => {
						return <></>
					}),
					<></>,
				]}
				children={[
					...questions.map((question: IQuestion) => {
						return (
							<QuizQuestion
								key={question.id}
								question={question}
								handleQuestionAnswer={handleQuestionAnswer}
							/>
						)
					}),
					<QuizEnd
						questions={questions}
						key={"qEnd"}
						navigation={navigation}
						quizId={quizId}
					/>,
				]}
			/>
		</VStack>
	)
}

export default Quiz
