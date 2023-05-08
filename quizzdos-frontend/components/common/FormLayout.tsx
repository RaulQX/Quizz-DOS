import { Flex, VStack } from "@react-native-material/core"
import React from "react"
import { ScrollView, KeyboardAvoidingView } from "react-native"

interface FormLayoutProps {
	children: React.ReactNode
}

const FormLayout = ({ children }: FormLayoutProps) => {
	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position">
				<Flex direction="column">
					<VStack style={{ marginTop: 40, marginHorizontal: 25 }}>
						{children}
					</VStack>
				</Flex>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

export default FormLayout
