import PaginatedHorizontalList from "components/common/PaginatedHorizontalList"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, ScrollView, View } from "react-native"
import UpdateQuiz from "./UpdateQuiz"
import { IQuestion } from "interfaces/CourseRelated"
import CreateQuestion from "./CreateQuestion"
import { ActivityIndicator, Modal, Snackbar } from "react-native-paper"
import { COLORS } from "palette/colors"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
	ICreateQuestion,
	IUpdateQuiz,
	fetchQuizQuestions,
	putQuizQuestions,
} from "Api/Professor/CreateQuiz"

const CreateQuiz = ({ route, navigation }: any) => {
	const quizId = route.params.quizId

	const [questions, setQuestions] = useState<IQuestion[]>([])
	const [visibleSnackBar, setVisibleSnackBar] = useState(false)
	const [autoScore, setAutoScore] = useState<boolean>(false)
	const [isAdding, setIsAdding] = useState(false)
	const listRef = useRef<ScrollView | null>(null)

	useQuery(["questions", quizId], () => fetchQuizQuestions(quizId), {
		onSuccess: (data) => setQuestions(data),
		onError: (error) => console.log(error),
	})

	const addNewQuestion = () => {
		setQuestions([
			...questions,
			{
				id: "00000000-0000-0000-0000-000000000000",
				prompt: "",
				questionScore: 0,
				tipAllowed: false,
				options: [],
			},
		])
		setIsAdding(true)

		setTimeout(() => {
			setIsAdding(false)
		}, 500)
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
			const score = Math.round(rawScore * 100) / 100
			if (index === questions.length - 1) {
				question.questionScore = Math.round(remaining * 100) / 100
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

		console.log(questions)
	}

	const checkErrors = () => {
		const error = questions.some((question) => {
			const hasEmptyPrompt = question.prompt === ""
			const hasInvalidScore =
				question.questionScore === 0 || question.questionScore > 10
			const hasEmptyOptions = question.options.some(
				(option) => option.text === ""
			)
			const hasInvalidTotalScore =
				questions.reduce((acc, curr) => acc + curr.questionScore, 0) !==
				10
			const hasInvalidOptionsScore =
				question.options.reduce(
					(acc, curr) => acc + curr.scorePercentage,
					0
				) !== 100
			const allOptionsAreCorrect = question.options.every(
				(option) => option.scorePercentage > 0
			)
			console.log("has empty prompt", hasEmptyPrompt)
			console.log("has invalid score", hasInvalidScore)
			console.log("has empty options", hasEmptyOptions)
			console.log("has invalid total score", hasInvalidTotalScore)
			console.log("has invalid options score", hasInvalidOptionsScore)
			console.log("all options are correct", allOptionsAreCorrect)

			return (
				hasEmptyPrompt ||
				hasInvalidScore ||
				hasEmptyOptions ||
				hasInvalidTotalScore ||
				hasInvalidOptionsScore ||
				allOptionsAreCorrect
			)
		})

		return error
	}
	const updateMutation = useMutation({
		mutationFn: ({ quizId, questions }: IUpdateQuiz) =>
			putQuizQuestions({ quizId, questions }),
		onSuccess: () => {
			navigation.navigate("CommonHome")
		},
		onError: (error) => {
			console.log(error)
		},
	})
	const saveQuiz = () => {
		if (checkErrors()) {
			setVisibleSnackBar(true)
			return
		}
		const questionsToCreate: ICreateQuestion[] = questions.map(
			(question) => ({
				id: question.id,
				prompt: question.prompt,
				questionScore: question.questionScore,
				tipAllowed: question.tipAllowed,
				options: question.options.map((option) => ({
					text: option.text,
					scorePercentage: option.scorePercentage,
				})),
			})
		)
		updateMutation.mutate({ quizId, questions: questionsToCreate })
	}

	return (
		<ScrollView>
			<View style={{ height: 20 }} />
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
					...questions.map((question: IQuestion, index) => (
						<CreateQuestion
							key={index}
							question={question}
							removeQuestion={removeQuestion}
							updateQuestion={saveQuestion}
							autoScore={autoScore}
							addNewQuestion={addNewQuestion}
						/>
					)),
					<UpdateQuiz
						totalQuestions={questions.length}
						totalScore={questions.reduce(
							(acc, curr) =>
								acc + parseFloat(curr.questionScore.toFixed(2)),
							0
						)}
						setQuestionScoreEqual={setAllQuestionsScoreEqualOutOf10}
						onSubmit={() => saveQuiz()}
						autoScore={autoScore}
						setAutoScore={setAutoScore}
						addNewQuestion={addNewQuestion}
					/>,
				]}
			/>
			<Snackbar
				visible={visibleSnackBar}
				duration={3000}
				onDismiss={() => {
					setVisibleSnackBar(false)
				}}
				style={{ alignItems: "center", justifyContent: "center" }}
			>
				{"Please fix all errors before submitting"}
			</Snackbar>
		</ScrollView>
	)
}

export default CreateQuiz
