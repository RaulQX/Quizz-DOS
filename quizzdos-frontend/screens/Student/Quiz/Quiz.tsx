import { VStack, Flex } from "@react-native-material/core"
import PaginatedHorizontalList from "components/common/PaginatedHorizontalList"
import { COLORS } from "palette/colors"
import React, { useEffect, useState } from "react"
import { Text } from "react-native"
import QuizQuestions from "./QuizQuestion"
import QuizQuestion from "./QuizQuestion"
import QuizEnd from "./QuizEnd"
import TopTextInArch from "components/common/TopTextInArch"

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
	isCorrect: boolean
	optionScore: number
}
const constProps = {
	name: "Quiz 1",
	questions: [
		{
			id: "01",
			prompt: "What is the capital of France?",
			questionScore: 4,
			tipAllowed: true,
			options: [
				{ id: "a", text: "Paris", isCorrect: true, optionScore: 4 },
				{
					id: "b",
					text: "London",
					isCorrect: false,
					optionScore: 0,
				},
				{ id: "c", text: "Rome", isCorrect: false, optionScore: 0 },
				{
					id: "d",
					text: "Madrid",
					isCorrect: false,
					optionScore: 0,
				},
			],
			chosenOptions: [],
		},
		{
			id: "02",
			prompt: "What is the answer to x^2 - 1 = 0?",
			questionScore: 4,
			tipAllowed: true,
			options: [
				{ id: "a", text: "1", isCorrect: false, optionScore: 2 },
				{ id: "b", text: "2", isCorrect: false, optionScore: 0 },
				{ id: "c", text: "0", isCorrect: true, optionScore: 0 },
				{ id: "d", text: "-1", isCorrect: false, optionScore: 2 },
			],
			chosenOptions: [],
		},
		{
			id: "03",
			prompt: "Is this a question?",
			questionScore: 2,
			tipAllowed: false,
			options: [
				{ id: "a", text: "Yes", isCorrect: true, optionScore: 2 },
				{ id: "b", text: "No", isCorrect: false, optionScore: 0 },
			],
			chosenOptions: [],
		},
	],
}

const Quiz = ({ navigation }: any) => {
	const [refresh, setRefresh] = useState(false)
	const [questions, setQuestions] = useState<IQuestion[]>(
		constProps.questions
	)
	const [chosenOptions, setChosenOptions] = useState<string[]>([])

	useEffect(() => {
		setQuestions(constProps.questions)
	}, [refresh])

	const handleQuestionAnswer = (questionId: string, optionId: string) => {
		

		const newQuestions = questions.map((question: IQuestion) => {
			if (question.id === questionId) {
				const newChosenOptions = question.chosenOptions
				if (newChosenOptions.includes(optionId)) {
					newChosenOptions.splice(newChosenOptions.indexOf(optionId), 1)
				} else {
					newChosenOptions.push(optionId)
				}
				return { ...question, chosenOptions: newChosenOptions }
			} else {
				return question
			}
		})
		setQuestions(newQuestions)

		setRefresh(!refresh)
	}

	return (
		<VStack justify="between" style={{ height: "100%" }}>
			<TopTextInArch firstLine={constProps.name} secondLine={constProps.questions.length + ' questions'}/>

			<PaginatedHorizontalList
				navItems={[
					...constProps.questions.map(() => {
						return <></>
					}),
					<></>,
				]}
				children={[
					...constProps.questions.map((question: IQuestion) => {
						return (
							<QuizQuestion
								question={question}
								handleQuestionAnswer={handleQuestionAnswer}
							/>
						)
					}),
					<QuizEnd questions={questions}/>,
				]}
			/>
		</VStack>
	)
}

export default Quiz
