import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

interface IFetchPeople {
	name: string
	pageParam: number
	pageSize: number
}

export const fetchPeople = async ({ name, pageParam, pageSize }: IFetchPeople) => {

	const response = await axios.get(`${ApiEndpoints.Admin.people}`, {
		params: {
			name,
			pageParam,
			pageSize,
		},
	})
	//console.log(response.data)
	return response.data
}
