import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

export const fetchSettings = async (personId: string) => {
	const response = await axios.get(
		`${ApiEndpoints.People.personSettings}/${personId}`
	)
	return response.data
}

interface IUpdateSettings {
	personId: string
	firstName: string
	lastName: string
	gender: number
}

export const updateSettings = async ({
	personId,
	firstName,
	lastName,
	gender,
}: IUpdateSettings) => {
	const respone = await axios.put(
		`${ApiEndpoints.People.updatePerson}/${personId}`,
		null,
		{
			params: {
				firstName: firstName,
				lastName: lastName,
				gender: gender,
			},
		}
	)
	return respone.data
}
