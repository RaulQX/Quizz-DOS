import { COLORS } from "palette/colors"
import React from "react"
import { Appbar } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { Flex } from "@react-native-material/core"
interface BottomAppbarProps {
	navigation: any
	children: React.ReactNode
}
const BottomAppbarLayout = ({ navigation, children }: BottomAppbarProps) => {

	const [unreadNotifications, setUnreadNotifications] = React.useState(false)


	return (
		<Flex justify="between" style={{ height: "100%" }}>
			{children}
			<View style={{ marginTop: 64 }}>
				<Appbar style={[styles.AppBar]} elevated={true}>
					<Appbar.Action
						icon="home"
						iconColor="white"
						onPress={() => console.log("Pressed")}
					/>
					<Appbar.Action
						icon="chart-line"
						iconColor="white"
						onPress={() => console.log("Pressed")}
					/>
					<Appbar.Action
						icon={!unreadNotifications ? "bell" : "bell-badge"}
						iconColor="white"
						onPress={() => console.log("Pressed")}
					/>
					<Appbar.Action
						icon="cog"
						iconColor="white"
						onPress={() => console.log("Pressed")}
					/>
				</Appbar>
			</View>
		</Flex>
	)
}

export default BottomAppbarLayout

const styles = StyleSheet.create({
	AppBar: {
		backgroundColor: COLORS.charcoal,
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "space-around",
	},
})
