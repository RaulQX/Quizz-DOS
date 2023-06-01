import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

interface ICreateSection {
	courseId: string
	name: string
	summary: string
}

export const createSection = async (section: ICreateSection) => {
	const response = await axios.post(
		ApiEndpoints.Sections.addSection,
		section,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	)

	return response.data
}

export const fetchCourse = async (courseId: string) => {
	console.log("cid", courseId)
	console.log("url", `${ApiEndpoints.Courses.getCourse}/${courseId}`)
	const response = await axios.get(
		`${ApiEndpoints.Courses.getCourse}/${courseId}`
	)
	console.log("res", response.data)
	return response.data
}

interface Quiz {
	id: string
	name: string
	status: number
}

interface Section {
	id: string
	name: string
	summary: string
	progress: number
	quizzes: Quiz[]
}

export interface ICourse {
	name: string
	shortName: string
	summary: string
	materialsUrl: string
	sections: Section[]
}
