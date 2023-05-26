import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import React from "react"
import { Text } from "react-native"
const CreateCourse = ({ navigation }: any) => {
	return (
		<BottomAppbarLayout navigation={navigation}>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "bold",
					textAlign: "center",
					marginTop: 20,
				}}
			>
				Create Course
			</Text>
		</BottomAppbarLayout>
	)
}

export default CreateCourse
