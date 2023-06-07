import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

export const fetchNotifications = async (personId: string) => {
	const response = await axios.get(
		`${ApiEndpoints.Notifications.getNotifications}/${personId}`
	)
	return response.data
}

export const markAsRead = async (notificationIds: string[]) => {
	const response = await axios.put(
		ApiEndpoints.Notifications.markAsRead,
		null,
		{ params: { notificationIds } }
	)
	console.log(response.data)
	return response.data
}
