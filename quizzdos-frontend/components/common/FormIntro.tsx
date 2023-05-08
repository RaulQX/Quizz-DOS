import { HStack } from "@react-native-material/core"
import { COLORS } from "palette/colors"
import React from "react"
import { Text } from "react-native"

const FormIntro = (props: FormIntroProps) => {
	return (
		<HStack spacing={10}>
			<Text
				style={{
					color: COLORS.white,
					fontSize: 40,
					fontWeight: "bold",
				}}
			>
				{props.whiteText}
			</Text>
			<Text
				style={{
					color: COLORS.blue,
					fontSize: 40,
					fontWeight: "bold",
				}}
			>
				{props.blueText}
			</Text>
		</HStack>
	)
}

interface FormIntroProps {
	onPress?: () => void
	whiteText: string
	blueText: string
}

export default FormIntro
