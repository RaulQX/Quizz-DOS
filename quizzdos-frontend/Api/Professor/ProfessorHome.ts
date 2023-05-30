import axios from "axios"
import { ApiEndpoints } from "Api/ApiConstants"

export interface ICreatedCourseQuery {
	pageParam: number
	pageSize: number
	creatorId: string
}

export const fetchCreatedCourses = async ({
	creatorId,
	pageParam,
	pageSize,
}: ICreatedCourseQuery) => {

	const response = await axios.get(
		`${ApiEndpoints.Courses.createdCourses}/${creatorId}`,
		{
			params: { pageParam, pageSize },
		}
	)
	console.log(response.data)
	return response.data
}
