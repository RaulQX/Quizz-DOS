import { ROLES } from "constants/Constants"
import useUser from "contexts/user/UserContext"
import React from "react"
import AdminHome from "screens/Admin/AdminHome"
import CommonHome from "./CommonHome"

const Home = ({ navigation }: any) => {
	const { role } = useUser()

	switch (role) {
		case ROLES.admin:
		return <AdminHome navigation={navigation} />
		case ROLES.student:
		case ROLES.professor:
			return <CommonHome navigation={navigation} />
		default:
			return <CommonHome navigation={navigation} />
	}
}

export default Home
