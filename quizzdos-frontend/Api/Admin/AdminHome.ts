import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

export const fetchDashboard = async () => {
	const response = await axios.get(`${ApiEndpoints.Admin.dashboard}`)
	console.log(response.data)
	return response.data
}
