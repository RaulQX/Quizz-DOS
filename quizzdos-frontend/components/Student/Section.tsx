import { COLORS } from "palette/colors"
import React from "react"
import { List } from "react-native-paper"

export interface SectionProps {
	section: {
		id: string
		index: number
		name: string
		progress: number
		summary: string
		quizzes: QuizProps[]
	}
}

export interface QuizProps {
	id: string
	name: string
	index: number
	status: number
}

const Section = ({ section }: SectionProps) => {
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
							console.log(
								quiz.status === 0
									? "progress-helper"
									: quiz.status === 1
									? "progress-check"
									: "check-bold"
							)
							// navigation.navigate("Quiz", {
							// 	quizId: quiz.id,
							// })
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
