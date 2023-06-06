import { HStack } from "@react-native-material/core"
import { COLORS } from "palette/colors"
import React from "react"
import { Text } from "react-native"
import { Divider } from "react-native-paper"

interface BlueTextHStackProps {
	text: string
	children: React.ReactNode
	marginTop?: number
}

const BlueTextHStack = ({ text, children, marginTop }: BlueTextHStackProps) => {
	return (
		<>
			<HStack justify="between">
				<Text
					style={{
						color: COLORS.blue,
						fontSize: 20,
						marginTop: marginTop ? marginTop : 0,
					}}
				>
					<Text>{text}</Text>
				</Text>
				{children}
			</HStack>
			<Divider style={{ marginVertical: 15, height: 2 }} />
		</>
	)
}

export default BlueTextHStack
