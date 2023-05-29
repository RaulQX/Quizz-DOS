import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import PaginatedHorizontalList from "components/common/PaginatedHorizontalList"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, ScrollView, View } from "react-native"
import UpdateQuiz from "./UpdateQuiz"
import { IQuestion } from "interfaces/CourseRelated"
import CreateQuestion from "./CreateQuestion"
import { Button, ActivityIndicator, Modal } from "react-native-paper"
import { COLORS } from "palette/colors"

const CreateQuiz = ({ navigation }: any) => {
	let fetchedQuestions = [
		{
			id: "0",
			prompt: "What is the capital of France?",
			questionScore: 3,
			tipAllowed: true,
			options: [
				{
					questionId: "1",
					text: "Paris",
					scorePercentage: 100,
				},
				{
					questionId: "1",
					text: "Marseille",
					scorePercentage: 0,
				},
				{
					questionId: "1",
					text: "Lyon",
					scorePercentage: 0,
				},
			],
		},
	]
	const [questions, setQuestions] = useState<IQuestion[]>(fetchedQuestions)
	const [autoScore, setAutoScore] = useState<boolean>(false)
	const [isAdding, setIsAdding] = useState(false)
	const listRef = useRef<ScrollView | null>(null)

	const addNewQuestion = () => {
		setQuestions([
			...questions,
			{
				id: questions.length.toString(),
				prompt: "",
				questionScore: 0,
				tipAllowed: false,
				options: [],
			},
		])
		setIsAdding(true)

		setTimeout(() => {
			setIsAdding(false)
		}, 500) // Adjust the delay as needed
	}

	useEffect(() => {
		if (isAdding && listRef.current) {
			const newIndex = questions.length - 1
			listRef.current.scrollTo(Dimensions.get("window").width * newIndex)
			setIsAdding(false)
		}
	}, [isAdding])

	const setAllQuestionsScoreEqualOutOf10 = () => {
		const rawScore = 10 / questions.length
		let remaining = 10

		const updatedQuestions = questions.map((question, index) => {
			const score = Math.round(rawScore * 100) / 100 // Round to 2 decimal places
			if (index === questions.length - 1) {
				question.questionScore = Math.round(remaining * 100) / 100 // Round to 2 decimal places
			} else {
				question.questionScore = score
				remaining -= score
			}

			return question
		})

		setQuestions(updatedQuestions)
	}

	const removeQuestion = (questionId: string) => {
		setQuestions(questions.filter((question) => question.id !== questionId))
	}

	const saveQuestion = (updatedQuestion: IQuestion) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((question) =>
				question.id === updatedQuestion.id ? updatedQuestion : question
			)
		)
	}

	return (
		<ScrollView>
			<View style={{ height: 20 }} />
			<Button
				icon="plus-circle-outline"
				contentStyle={{
					backgroundColor: COLORS.blue,
					flexDirection: "row-reverse",
				}}
				mode="contained"
				onPress={() => {
					addNewQuestion()
				}}
				style={{ alignSelf: "flex-end", margin: 10 }}
			>
				{"Add New Question"}
			</Button>
			<Modal visible={isAdding}>
				{isAdding && (
					<ActivityIndicator
						animating={true}
						color={COLORS.blue}
						size={"large"}
					/>
				)}
			</Modal>

			<PaginatedHorizontalList
				ref={listRef}
				navItems={[
					...questions.map(() => {
						return <></>
					}),
					<></>,
				]}
				children={[
					...questions.map((question: IQuestion) => (
						<CreateQuestion
							key={question.id}
							question={question}
							removeQuestion={removeQuestion}
							updateQuestion={saveQuestion}
							autoScore={autoScore}
						/>
					)),
					<UpdateQuiz
						key="update-quiz"
						totalQuestions={questions.length}
						totalScore={questions.reduce(
							(acc, curr) =>
								acc + parseFloat(curr.questionScore.toFixed(2)),
							0
						)}
						setQuestionScoreEqual={setAllQuestionsScoreEqualOutOf10}
						onSubmit={() => console.log("sub")}
						autoScore={autoScore}
						setAutoScore={setAutoScore}
					/>,
				]}
			/>
		</ScrollView>
	)
}

export default CreateQuiz
