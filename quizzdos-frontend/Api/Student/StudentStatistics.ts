import axios from "axios"
import { ApiEndpoints } from "Api/ApiConstants"

export interface IStatisticsCourse {
	id: string
	shortName: string
	sections: IStatisticsSection[]
}
export interface IStatisticsSection {
	id: string
	name: string
	quizzes: IStatisticsQuiz[]
	average: number
}

export interface IStatisticsQuiz {
	id: string
	name: string
	grade: number
}

export const fetchStudentStatistics = async (personId: string) => {
	const response = await axios.get(
		`${ApiEndpoints.Statistics.studentStatistics}/${personId}`
	)
	return response.data
}
