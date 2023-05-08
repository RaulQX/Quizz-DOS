import { COLORS } from "palette/colors"
import React from "react"
import { Pressable } from "react-native"
import { Text } from "react-native"

const TextButton = (props: TextButtonProps) => {
	return (
		<Pressable
			onPress={props.onPress}
			android_ripple={{ color: "rgba(0, 0, 0, 0.3)" }}
			style={{
				width: props.width || "80%",
				backgroundColor: props.color || COLORS.blue,
				height: props.height || 50,
				borderRadius: props.borderRadius || 20,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
				marginBottom: props.marginBottom || 0,
			}}
		>
			<Text
				style={{
					color: props.fontColor || COLORS.almostWhite,
					fontSize: props.fontSize || 20,
					textAlign: "center",
					textAlignVertical: "center",
					lineHeight: 50,
					fontWeight: "400",
				}}
			>
				{props.text}
			</Text>
		</Pressable>
	)
}
interface TextButtonProps {
	onPress: (a: any) => void
	text: string
	width?: string
	color?: string
	height?: string
	borderRadius?: number
	pressbleStyle?: any
	textStyle?: any
	fontSize?: number
	fontColor?: string
	marginBottom?: number
}
export default TextButton
