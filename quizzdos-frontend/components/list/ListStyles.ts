import { COLORS } from "palette/colors"
import { StyleSheet } from "react-native"

export const listStyles = StyleSheet.create({
	listAccordian: {
		backgroundColor: COLORS.dark,
		marginHorizontal: 0,
		padding: 0,
		width: "100%",
	},
	listAccordianTitle: {
		color: COLORS.blue,
		fontSize: 20,
		fontWeight: "700",
		marginHorizontal: 0,
		textAlign: "left",
		alignSelf: "flex-start",
		padding: 0,
	},
	listItem: {
		backgroundColor: COLORS.dark,
		marginHorizontal: 0,
		paddingLeft: 5,
		width: "100%",
	},
	listItemTitle: {
		color: COLORS.white,
	},
})
