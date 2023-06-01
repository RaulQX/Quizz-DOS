import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

export const fetchQuizQuestions = async (quizId: string) => {
	const response = await axios.get(
		`${ApiEndpoints.Quizzes.fetchQuizQuestions}/${quizId}/questions`
	)
	return response.data
}

export interface ICreateQuestion {
	id: string
	prompt: string
	questionScore: number
	tipAllowed: boolean
	options: ICreateOption[]
}

export interface ICreateOption {
	text: string
	scorePercentage: number
}

export interface IUpdateQuiz {
	quizId: string
	questions: ICreateQuestion[]
}

export const putQuizQuestions = async (quiz: IUpdateQuiz) => {
	console.log(quiz.questions)
	for (let i = 0; i < quiz.questions.length; i++) {
		console.log(quiz.questions[i].options)
	}

	const response = await axios.put(
		`${ApiEndpoints.Quizzes.putQuizQuestions}/${quiz.quizId}/questions`,
		quiz.questions
	)

	return response.data
}
