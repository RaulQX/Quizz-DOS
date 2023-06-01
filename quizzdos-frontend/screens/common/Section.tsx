import { COLORS } from "palette/colors"
import React, { useState } from "react"
import { Button, IconButton, List, Modal, TextInput } from "react-native-paper"
import { Text } from "react-native"
import useUser from "contexts/user/UserContext"
import { ROLES } from "constants/Constants"
import { HStack, VStack } from "@react-native-material/core"
import { useMutation } from "@tanstack/react-query"
import { createQuiz } from "Api/Professor/Section"


export interface SectionProps {
	section: {
		id: string
		name: string
		progress: number
		summary: string
		quizzes: QuizProps[]
	}
	refreshCourse: boolean
	setRefreshCourse: (value: boolean) => void
	navigation: any
}

export interface QuizProps {
	id: string
	name: string
	status: number
}

const Section = ({
	refreshCourse,
	setRefreshCourse,
	section,
	navigation
}: SectionProps) => {
	const { role } = useUser()
	const isProfessor = role === ROLES.professor

	const [addQuiz, setAddQuiz] = useState(false)
	const [addQuizName, setAddQuizName] = useState("")

	const handleAddQuiz = () => {
		if (addQuizName.length === 0) {
			return
		}

		createQuizMutation.mutate({
			sectionId: section.id,
			name: addQuizName,
		})
	}

	const createQuizMutation = useMutation({
		mutationFn: (data: any) => createQuiz(data),
		onSuccess: (_: any) => {
			console.log("Quiz created successfully!")
			setRefreshCourse(!refreshCourse)
			setAddQuizName("")
			setAddQuiz(false)
		},
		onError: ({ response: { data } }) => {
			console.log(data)
		},
	})

	return (
		<List.Accordion
			key={section.id}
			id={section.id + " listAccId"}
			style={{
				backgroundColor: COLORS.dark,
				marginHorizontal: 0,
				padding: 0,
			}}
			right={(props) => (
				<List.Icon {...props} icon="chevron-down" color={COLORS.blue} />
			)}
			title={section.name}
			titleStyle={{
				color: COLORS.blue,
				fontSize: 20,
				fontWeight: "bold",
			}}
			description={section.summary}
			descriptionNumberOfLines={2}
			descriptionStyle={{ color: COLORS.gray }}
		>
			{isProfessor && (
				<Button
					icon={
						!addQuiz
							? "plus-circle-outline"
							: "minus-circle-outline"
					}
					contentStyle={{
						backgroundColor: !addQuiz ? COLORS.blue : COLORS.red,
						flexDirection: "row-reverse",
					}}
					mode="contained"
					onPress={() => {
						setAddQuiz(!addQuiz)
					}}
					style={{ alignSelf: "flex-end" }}
				>
					{!addQuiz ? "Add Quiz" : "Cancel"}
				</Button>
			)}
			{section.quizzes.length === 0 && !addQuiz && (
				<Text
					style={{
						color: COLORS.white,
						fontSize: 17,
						textAlign: "center",
					}}
				>
					No quizzes yet
				</Text>
			)}
			{addQuiz && (
				<HStack style={{marginVertical: 5}} justify="around">
					<TextInput
						mode="outlined"
						placeholder="QuizName"
						style={{ backgroundColor: "transparent", width: "70%", marginLeft: 10 }}
						theme={{
							roundness: 20,
							colors: { primary: COLORS.blue },
						}}
						textColor="white"
						inputMode="text"
						outlineColor={COLORS.gray}
						value={addQuizName}
						onChangeText={(text) => {
							setAddQuizName(text.replace(/[^a-zA-Z0-9 ]/g, ""))
						}}
						keyboardType="default"
						autoCapitalize="none"
						maxLength={50}
					/>
					<IconButton
						icon="check"
						onPress={handleAddQuiz}
						iconColor="green"
						style={{borderColor: "green", borderWidth: 1, borderRadius: 10, alignSelf: "center", marginTop: 10}}
					/>
				</HStack>
			)}
			{section.quizzes.map((quiz: QuizProps) => {
				const statusIcon = () => {
					if (quiz.status === 0) {
						return {
							icon: "progress-close",
							color: "#AA4A44",
						}
					} else if (quiz.status === 1) {
						return {
							icon: "progress-check",
							color: COLORS.paleYellow,
						}
					} else {
						return {
							icon: "checkbox-marked-circle",
							color: COLORS.blue,
						}
					}
				}
				const { icon, color } = statusIcon()

				return (
					<List.Item
						key={quiz.id}
						style={{
							backgroundColor: COLORS.dark,
							marginHorizontal: 0,
							padding: 0,
						}}
						left={(props) => (
							<List.Icon
								{...props}
								icon="play"
								color={COLORS.blue}
							/>
						)}
						title={quiz.name}
						titleStyle={{
							color: COLORS.white,
							fontSize: 15,
							fontWeight: "bold",
						}}
						onPress={() => {
							!isProfessor && navigation.navigate("QuizStart",{
								quizId: quiz.id,
							})
							
							isProfessor && navigation.navigate("CreateQuiz", {
								quizId: quiz.id,
							})
						}}
						right={(props) => (
							<List.Icon {...props} icon={icon} color={color} />
						)}
					/>
				)
			})}
		</List.Accordion>
	)
}

export default Section
