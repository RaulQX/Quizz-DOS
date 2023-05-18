import { VStack } from "@react-native-material/core"
import { COLORS } from "palette/colors"
import React from "react"
import { Text } from "react-native"

interface TopTextInArchProps {
    firstLine: string
    secondLine?: string
}

const TopTextInArch = ({firstLine, secondLine}: TopTextInArchProps) => {
	return (
		<VStack
			style={{
				alignItems: "center",
				justifyContent: "flex-end",
				backgroundColor: COLORS.charcoal,
				borderBottomEndRadius: 50,
				borderBottomStartRadius: 50,
				paddingBottom: 15,
			}}
		>
			<VStack spacing={10}>
				<Text
					style={{
						fontSize: 30,
						marginTop: 30,
						textAlign: "center",
						color: COLORS.white,
					}}
				>
					{firstLine}
				</Text>
				<Text
					style={{
						fontSize: 20,
						textAlign: "center",
						color: COLORS.blue,
					}}
				>
					{secondLine}
				</Text>
			</VStack>
		</VStack>
	)
}

export default TopTextInArch
