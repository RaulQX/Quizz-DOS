import { HStack } from "@react-native-material/core"
import { COLORS } from "palette/colors"
import React from "react"
import { Text, View } from "react-native"
import TextButton from "./TextButton"
import { Button } from "react-native-paper"

const FormEnd = (props: any) => {
	return (
		<View style={{marginTop: 20}}>
			<TextButton
				text={props.buttonText}
				icon={props.buttonIcon}
				onPress={props.onPress}
			/>
			<HStack
				style={{
					marginTop: 20,
					justifyContent: "center",
				}}
			>
				<Text style={{ color: COLORS.white, fontSize: 15 }}>
					{props.underButtonText}
				</Text>
				<Button
					dark={true}
					icon="account-plus"
					mode="text"
					labelStyle={{
						fontSize: 15,
						color: COLORS.blue,
					}}
					style={{
						marginTop: -8,
					}}
					onPress={props.underButtonNavigation}
				>
					{props.underButtonNavigationText}
				</Button>
			</HStack>
		</View>
	)
}

interface FormEndProps {
	buttonText: string
	buttonIcon: string
	onPress: () => void
	underButtonText: string
	underButtonNavigation: () => void
	underButtonNavigationText: string
}

export default FormEnd
