import { COLORS } from "palette/colors"
import React from "react"
import { Modal } from "react-native-paper"
import TextButton from "./TextButton"
import { Text } from "react-native"

interface ButtonModalProps {
	modalVisible: boolean
	setModalVisible: (visible: boolean) => void
	modalTitle: string
	modalMessage: string
	modalButtonText: string
	onPress: () => void
}

const ButtonModal = (props: ButtonModalProps) => {
	return (
		<Modal
			visible={props.modalVisible}
			onDismiss={() => props.setModalVisible(false)}
			style={{ zIndex: 1000 }}
			contentContainerStyle={{
				backgroundColor: COLORS.dark,
				height: 200,
				width: 300,
				position: "absolute",
				top: 200,
				left: 50,
				padding: 20,
			}}
		>
			<Text
				style={{
					color: COLORS.blue,
					fontSize: 20,
					fontWeight: "bold",
					textAlign: "center",
				}}
			>
				{props.modalTitle}
			</Text>
			<Text
				style={{
					textAlign: "center",
					color: COLORS.white,
					fontSize: 15,
					marginTop: 20,
				}}
			>
				{props.modalMessage}
			</Text>
			<TextButton text={props.modalButtonText} onPress={props.onPress} />
		</Modal>
	)
}

export default ButtonModal
