import { NewAccountDetails } from "Api/ApiInterfaces"
import axios from "axios"
import { ApiEndpoints } from "Api/ApiConstants"

export interface newAccountMutation {
	personId: string
	data: NewAccountDetails
}

export const updateNewAccountDetails = async (
	personId: string,
	personData: NewAccountDetails
) => {
	const response = await axios.put(
		`${ApiEndpoints.People.personById}/${personId}`,
		null,
		{
			params: {
				firstName: personData.firstName,
				lastName: personData.lastName,
				gender: personData.gender,
			},
		}
	)
	return response
}
