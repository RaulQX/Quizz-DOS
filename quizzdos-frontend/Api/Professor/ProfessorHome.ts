import axios from "axios"
import { ApiEndpoints } from "constants/ApiConstants"

export interface ICreatedCourseQuery {
	page: number
	pageSize: number
	creatorId: string
}

export const fetchCreatedCourses = async ({
	creatorId,
	page,
	pageSize,
}: ICreatedCourseQuery) => {
	const response = await axios.get(
		`${ApiEndpoints.Course.createdCourses}/${creatorId}`,
		{
			params: { page, pageSize },
		}
	)
	return response.data
}
