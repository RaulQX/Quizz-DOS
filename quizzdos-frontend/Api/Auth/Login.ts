import axios from "axios"
import { ApiEndpoints } from "constants/ApiConstants"

export const loginUser = async (userPayload: any) => {
	let { data: response } = await axios.post(ApiEndpoints.Auth.login, {
		username: userPayload.credentials,
		email: userPayload.credentials,
		phoneNumber: userPayload.credentials,
		password: userPayload.password,
	})

	const { data: user } = await axios.get(ApiEndpoints.User.currentUser, {
		headers: {
			Accept: "text/plain",
			"Content-Type": "application/json",
			Authorization: `${response}`,
		},
	})

    console.log("user: " , user)

	const encodedValue = encodeURIComponent(user.id)
	let { data: person } = await axios.get(
		`${ApiEndpoints.Person.personByUserId}/${encodedValue}`
	)
    console.log("person: " , person)

	return {
		username: user.username,
		personId: person.id,
		role: person.role,
		gender: person.gender,
		firstName: person.firstName,
		lastName: person.lastName,
		profileSetup: person.firstName === "" ? false : true,
	}
}
