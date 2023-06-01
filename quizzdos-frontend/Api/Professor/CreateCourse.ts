import axios from "axios"
import { ApiEndpoints } from "Api/ApiConstants"

interface ICreateCourse {
	creatorId: string
	name: string
	shortName: string
	summary: string
	materialsUrl: string
	icon: string
}

export const createCourse = async (course: ICreateCourse) => {

	const response = await axios.post(ApiEndpoints.Courses.addCourse, course, {
		headers: {
			"Content-Type": "application/json",
		},
	})
	return response.data
}


