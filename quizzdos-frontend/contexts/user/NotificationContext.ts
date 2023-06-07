import { createContext } from "react"
import { INotification } from "screens/common/Notifications"
export const NotificationContext = createContext<INotification[]>([])
