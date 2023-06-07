import { ApiEndpoints } from "Api/ApiConstants"
import axios from "axios"

export const fetchNotifications = async (personId: string) => {
	try {
		const response = await axios.get(
			`${ApiEndpoints.Notifications.getNotifications}/${personId}`
		)
		return response.data
	} catch (e) {
		console.log(e)
	}
}

export const markAsRead = async (notificationIds: string[]) => {
	const response = await axios.put(
		ApiEndpoints.Notifications.markAsRead,
		notificationIds,
		{
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			},
		}
	)
	console.log(response.data)
	return response.data
}

export const fetchHasUnreadNotifications = async (personId: string) => {
	const response = await axios.get(
		`${ApiEndpoints.Notifications.hasUnreadNotifications}/${personId}/unread`
	)
	return response.data
}
