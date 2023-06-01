import { COLORS } from "palette/colors"
import React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { Button } from "react-native-paper"

const TextButton = (props: TextButtonProps) => {
	return (
		<Button
			dark={true}
			icon={props.icon}
			mode={props.mode || "contained"}
			buttonColor={props.buttonColor || COLORS.blue}
			labelStyle={
				props.labelStyle || {
					fontSize: 23,
					paddingTop: 7,
					color: COLORS.white,
				}
			}
			style={
				props.style || {
					borderRadius: 20,
					marginTop: 15,
					height: 50,
					width: "100%",
				}
			}
			onPress={props.onPress}
			disabled={props.disabled}
		>
			{props.text}
		</Button>
	)
}

interface TextButtonProps {
	icon?: string
	mode?:
		| "text"
		| "outlined"
		| "contained"
		| "elevated"
		| "contained-tonal"
		| undefined
	buttonColor?: string
	labelStyle?: StyleProp<TextStyle>
	style?: StyleProp<ViewStyle>
	onPress: () => void
	text: string
	disabled?: boolean
}
export default TextButton
