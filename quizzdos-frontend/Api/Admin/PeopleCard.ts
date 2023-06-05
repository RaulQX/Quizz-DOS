import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

export interface IUpdateRole {
	personId: string
	role: number
}

export const updatePersonRole = async ({ personId, role }: IUpdateRole) => {
	const response = await axios.put(
		`${ApiEndpoints.Admin.updateRole}/${personId}/role`,
		{},
		{
			params: {
				role: role,
			},
		}
	)
	console.log(response.data)
	return response.data
}
