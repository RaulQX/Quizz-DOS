import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

export interface IProfessorsStatisticsCourse {
	id: string
	shortName: string
	studentsNumber: number
	averageGrade: number
}

export interface IProfessorsStatistics {
	personId: string
	pageSize: number
	pageParam: number
}

export const fetchProfessorsStatistics = async ({
	personId,
	pageParam,
	pageSize,
}: IProfessorsStatistics) => {
	const response = await axios.get(
		`${ApiEndpoints.Statistics.professorsStatistics}/${personId}`,
		{
			params: { pageParam, pageSize },
		}
	)
	return response.data
}
