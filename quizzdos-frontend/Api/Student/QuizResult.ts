import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

interface IGrade {
	personId: string
	quizId: string
	grade: number
}

export const addGrade = async ({ personId, quizId, grade }: IGrade) => {
	const response = await axios({
		method: "post",
		url: `${ApiEndpoints.Quizzes.gradeQuiz}/grade`,
		data: {
			QuizId: quizId,
			PersonId: personId,
			QuizGrade: grade,
		},
		headers: {
			"Content-Type": "application/json",
		},
	})

	return response.data
}
