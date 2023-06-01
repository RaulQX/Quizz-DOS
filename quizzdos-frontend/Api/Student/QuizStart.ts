import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

interface IFetchQuiz {
    quizId: string
    personId: string
}

export const fetchQuiz = async ({quizId, personId}:IFetchQuiz) => {
    const response = await axios.get(
        `${ApiEndpoints.Quizzes.getQuiz}/${personId}/${quizId}`
    )
    return response.data

}