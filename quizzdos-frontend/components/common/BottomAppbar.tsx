import { COLORS } from "palette/colors"
import React from "react"
import { Appbar } from "react-native-paper"
import { StyleSheet } from "react-native"

const BottomAppbar = ({ navigation }: any) => {
	return (
		<Appbar style={[styles.AppBar]} elevated={true}>
			<Appbar.Action
				icon="home"
				iconColor="white"
				onPress={() => console.log("Pressed")}
			/>
			<Appbar.Action
				icon="account"
				iconColor="white"
				onPress={() => console.log("Pressed")}
			/>
			<Appbar.Action
				icon="bell"
				iconColor="white"
				onPress={() => console.log("Pressed")}
			/>
			<Appbar.Action
				icon="cog"
				iconColor="white"
				onPress={() => console.log("Pressed")}
			/>
		</Appbar>
	)
}

export default BottomAppbar

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
