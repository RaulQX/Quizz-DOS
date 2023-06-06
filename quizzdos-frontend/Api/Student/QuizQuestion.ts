import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

export const fetchTip = async (questionId: string) => {
	const response = await axios.get(
		`${ApiEndpoints.Quizzes.tip}/${questionId}/tip`
	)
	return response.data
}
