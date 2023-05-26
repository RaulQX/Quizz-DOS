import axios from "axios"
import { ApiEndpoints } from "constants/ApiConstants"

export interface IJoinedCourseQuery {
	page: number
	pageSize: number
	personId: string
}

export interface IJoinCourse {
	personId: string
	courseCode: string
}

export const fetchJoinedCourses = async ({
	personId,
	page,
	pageSize,
}: IJoinedCourseQuery) => {
	const response = await axios.get(
		`${ApiEndpoints.Course.joinedCourses}/${personId}/joined-courses`,
		{
			params: { page, pageSize },
		}
	)

	return response.data
}

export const joinCourse = async ({ courseCode, personId }: IJoinCourse) => {
	const response = await axios.post(
		`${ApiEndpoints.Course.joinCourse}/${courseCode}/people/${personId}`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
	return response.data
}
