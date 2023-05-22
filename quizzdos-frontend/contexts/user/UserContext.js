import { createContext, useReducer, useContext } from "react"
import UserReducer, { initialState } from "./UserReducer"

const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserReducer, initialState)

	const loginUser = async (user) => {
		dispatch({ type: "LOGIN", payload: user })
	}

	const updateProfile = async (user) => {
		dispatch({ type: "UPDATE_PROFILE", payload: user })
	}

	const logoutUser = () => {
		dispatch({ type: "LOGOUT" })
	}

	const value = {
		...state,
		loginUser: loginUser,
		logoutUser: logoutUser,
		updateProfile: updateProfile,
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUser = () => {
	const context = useContext(UserContext)

	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider")
	}

	return context
}

export default useUser
