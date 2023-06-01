import axios from "axios"
import { ApiEndpoints } from "Api/ApiConstants"

export interface IJoinedCourseQuery {
	pageParam: number
	pageSize: number
	personId: string
}

export interface IJoinCourse {
	personId: string
	courseCode: string
}

export const fetchJoinedCourses = async ({
	personId,
	pageParam,
	pageSize,
}: IJoinedCourseQuery) => {
	const response = await axios.get(
		`${ApiEndpoints.Courses.joinedCourses}/${personId}/joined-courses`,
		{
			params: { pageParam, pageSize },
		}
	)
	return response.data
}

export const joinCourse = async ({ courseCode, personId }: IJoinCourse) => {
	const response = await axios.post(
		`${ApiEndpoints.Courses.joinCourse}/${courseCode}/people/${personId}`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
	return response.data
}
