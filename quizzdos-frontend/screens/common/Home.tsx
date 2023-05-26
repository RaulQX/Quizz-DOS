import { ROLES } from "constants/Constants"
import useUser from "contexts/user/UserContext"
import React from "react"
import CommonHome from "./CommonHome"

const Home = ({ navigation }: any) => {
	const { role } = useUser()

	return {
		//[ROLES.admin]: <AdminHome navigation={navigation} />,
		[ROLES.student]: <CommonHome navigation={navigation} />,
		[ROLES.professor]: <CommonHome navigation={navigation} />,
	}[role]
}

export default Home
