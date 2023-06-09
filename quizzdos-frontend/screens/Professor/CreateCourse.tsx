import { HStack, VStack } from "@react-native-material/core"
import BottomAppbarLayout from "components/common/BottomAppbarLayout"
import TopTextInArch from "components/common/TopTextInArch"
import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Text } from "react-native"
import { TextInput } from "react-native-paper"
import IconPicker from "components/common/IconPicker"
import { ICONS_LIST } from "constants/Constants"
import TextButton from "components/common/TextButton"
import { useMutation } from "@tanstack/react-query"
import { createCourse } from "Api/Professor/CreateCourse"
import useUser from "contexts/user/UserContext"

const CreateCourse = ({ route, navigation }: any) => {
	const { refetch } = route.params

	const { personId } = useUser()
	const [courseName, setCourseName] = useState("")
	const [courseNameError, setCourseNameError] = useState(false)

	const [courseShortName, setCourseShortName] = useState("")
	const [courseShortNameError, setCourseShortNameError] = useState(false)

	const [courseSummary, setCourseSummary] = useState("")
	const [courseSummaryError, setCourseSummaryError] = useState(false)

	const [courseMaterialsUrl, setCourseMaterialsUrl] = useState("")
	const [courseMaterialsUrlError, setCourseMaterialsUrlError] =
		useState(false)
	const [courseIcon, setCourseIcon] = useState("home")

	const createCourseMutation = useMutation({
		mutationFn: (data: any) => createCourse(data),
		onSuccess: (_: any) => {
			console.log("Course created successfully!")

			navigation.navigate("Home")
			refetch()
		},
		onError: ({ response: { data } }) => {
			console.log(data)
		},
	})

	const handleCreateCourse = async () => {
		courseName.length === 0
			? setCourseNameError(true)
			: setCourseNameError(false)
		courseShortName.length === 0
			? setCourseShortNameError(true)
			: setCourseShortNameError(false)
		courseSummary.length === 0
			? setCourseSummaryError(true)
			: setCourseSummaryError(false)

		const urlRegex = /^(http|https):\/\/[^ "]+\.[^ "]+$/
		!urlRegex.test(courseMaterialsUrl)
			? setCourseMaterialsUrlError(true)
			: setCourseMaterialsUrlError(false)

		if (
			!courseNameError &&
			!courseShortNameError &&
			!courseSummaryError &&
			!courseMaterialsUrlError
		)
			createCourseMutation.mutate({
				creatorId: personId,
				name: courseName,
				shortName: courseShortName,
				summary: courseSummary,
				materialsUrl: courseMaterialsUrl,
				icon: courseIcon,
			})
	}

	return (
		<BottomAppbarLayout navigation={navigation}>
			<TopTextInArch firstLine="Create Course" />
			<VStack
				style={{
					borderColor: COLORS.blue,
					borderWidth: 2,
					marginTop: 30,
					borderRadius: 20,
					height: 550,
					padding: 20,
					width: "90%",
					alignSelf: "center",
				}}
				spacing={20}
			>
				<TextInput
					mode="outlined"
					placeholder="Course Name"
					style={{ backgroundColor: "transparent" }}
					theme={{
						roundness: 20,
						colors: { primary: COLORS.blue },
					}}
					textColor="white"
					outlineColor={COLORS.gray}
					onChangeText={(text) => {
						setCourseName(text)
					}}
					value={courseName}
					autoCapitalize="none"
					maxLength={50}
					error={courseNameError}
				/>
				<TextInput
					mode="outlined"
					placeholder="Course Short Name"
					style={{ backgroundColor: "transparent" }}
					theme={{
						roundness: 20,
						colors: { primary: COLORS.blue },
					}}
					textColor="white"
					outlineColor={COLORS.gray}
					onChangeText={(text) => {
						setCourseShortName(text)
					}}
					value={courseShortName}
					autoCapitalize="characters"
					maxLength={7}
					error={courseShortNameError}
				/>
				<TextInput
					mode="outlined"
					placeholder="Course Summary"
					style={{ backgroundColor: "transparent" }}
					theme={{
						roundness: 20,
						colors: { primary: COLORS.blue },
					}}
					textColor="white"
					outlineColor={COLORS.gray}
					onChangeText={(text) => {
						setCourseSummary(text)
					}}
					value={courseSummary}
					autoCapitalize="sentences"
					maxLength={150}
					multiline={true}
					numberOfLines={3}
					error={courseSummaryError}
				/>
				<TextInput
					mode="outlined"
					placeholder="Course Materials URL"
					style={{ backgroundColor: "transparent" }}
					theme={{
						roundness: 20,
						colors: { primary: COLORS.blue },
					}}
					textColor="white"
					outlineColor={COLORS.gray}
					onChangeText={(text) => {
						setCourseMaterialsUrl(text)
					}}
					value={courseMaterialsUrl}
					autoCapitalize="none"
					maxLength={150}
					error={courseMaterialsUrlError}
				/>
				<HStack
					items="center"
					justify="between"
					style={{
						borderWidth: 1,
						borderColor: "#757d86",
						borderRadius: 25,
						paddingVertical: 1,
						paddingHorizontal: 20,
						width: "100%",
					}}
					spacing={15}
				>
					<Text style={{ color: "#44414a", fontSize: 16 }}>
						Course Icon
					</Text>

					<IconPicker
						icons={[
							{
								family: "MaterialCommunityIcons",
								icons: ICONS_LIST,
							},
						]}
						onSelect={(icon) => setCourseIcon(icon)}
						courseIcon={courseIcon}
					/>
				</HStack>
				<TextButton
					text="Create Course"
					onPress={() => handleCreateCourse()}
					style={{ marginTop: 30 }}
				/>
			</VStack>
		</BottomAppbarLayout>
	)
}

export default CreateCourse
