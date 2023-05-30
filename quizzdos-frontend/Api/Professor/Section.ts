import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

interface ICreateQuiz {
	sectionId: number
	quizName: string
}

export const createQuiz = async (quiz: ICreateQuiz) => {
	const response = await axios.post(ApiEndpoints.Quizzes.addQuiz, quiz, {
		headers: {
			"Content-Type": "application/json",
		},
	})

	return response.data
}
