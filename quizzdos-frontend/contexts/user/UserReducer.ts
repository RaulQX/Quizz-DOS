import { GENDERS, ROLES } from "constants/Constants"

export const initialState = {
	personId: "",
	role: ROLES.student,
	gender: GENDERS.male,
	firstName: "",
	lastName: "",

	username: "",
	isLoggedIn: false,
	profileSetup: false,
	loginUser: async (payload: any) => {
		return Promise<void>
	},
	logoutUser: () => {},
	updateProfile: async (payload: any) => {
		return Promise<void>
	},
}

const UserReducer = (state: any, action: any) => {
	const { type, payload } = action

	switch (type) {
		case "LOGIN":
			return {
				...state,
				personId: payload.personId,
				role: payload.role,
				gender: payload.gender,
				firstName: payload.firstName,
				lastName: payload.lastName,
				joinedDate: payload.joinedDate,
				username: payload.username,
				profileSetup: payload.firstName !== "",
				isLoggedIn: true,
			}
		case "LOGOUT": {
			return {
				...state,

				personId: "",
				role: ROLES.student,
				gender: GENDERS.notSpecified,
				firstName: "",
				lastName: "",

				username: "",
				joinedDate: "",
				isLoggedIn: false,
			}
		}
		case "UPDATE_PROFILE":
			return {
				...state,
				firstName: payload.firstName,
				lastName: payload.lastName,
				gender: payload.gender,
			}
		default:
			throw new Error(`Unhandled action type: ${type}`)
	}
}

export default UserReducer
