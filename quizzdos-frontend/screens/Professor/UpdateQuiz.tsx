import { HStack, VStack } from "@react-native-material/core"
import { COLORS } from "palette/colors"
import React from "react"
import { Dimensions } from "react-native"
import { Checkbox, Divider, Surface } from "react-native-paper"
import { Text } from "react-native"
import TextButton from "components/common/TextButton"
import AnimatedLottieView from "lottie-react-native"

interface UpdateQuizProps {
	totalQuestions: number
	totalScore: number
	setQuestionScoreEqual: () => void
	onSubmit: () => void
	autoScore: boolean
	setAutoScore: (value: boolean) => void
}

const UpdateQuiz = ({
	onSubmit,
	totalQuestions,
	totalScore,
	setQuestionScoreEqual,
	autoScore,
	setAutoScore,
}: UpdateQuizProps) => {
	return (
		<Surface
			style={{
				backgroundColor: COLORS.charcoal,
				width: "90%",
				height: Dimensions.get("window").height * 0.75,
				alignSelf: "center",
				marginTop: Dimensions.get("window").height * 0.1 - 20,
				borderColor: COLORS.blue,
				borderWidth: 2,
				borderRadius: 20,
			}}
			elevation={2}
		>
			<VStack style={{ flex: 1, alignItems: "center" }} justify="around">
				<Text
					style={{
						color: COLORS.white,
						fontSize: 20,
						textAlign: "center",
					}}
				>
					Are you sure you want to update this quiz?
				</Text>
				<HStack
					justify="around"
					style={{ width: "100%", paddingHorizontal: 0 }}
				>
					<Text style={{ color: COLORS.white, fontSize: 20 }}>
						Questions: {totalQuestions}
					</Text>
					<Text style={{ color: COLORS.white, fontSize: 20 }}>
						Score: {totalScore.toFixed(2)}
					</Text>
				</HStack>
				<VStack spacing={5} style={{ width: "100%" }}>
					<Divider />
					<Text
						style={{
							color: COLORS.white,
							fontSize: 20,
							textAlign: "center",
						}}
					>
						The total score is{" "}
						<Text style={{ color: COLORS.blue }}>
							{totalScore.toFixed(2)}
						</Text>
						/10.
					</Text>
					<HStack justify="center">
						<Text
							style={{
								color: COLORS.white,
								fontSize: 20,
								textAlignVertical: "center",
							}}
						>
							Auto score questions
						</Text>
						<Checkbox
							status={autoScore ? "checked" : "unchecked"}
							onPress={() => {
								setAutoScore(!autoScore)
								setQuestionScoreEqual()
							}}
							color={COLORS.blue}
						/>
					</HStack>
					<Divider />
				</VStack>

				<AnimatedLottieView
					source={require("assets/animations/checklist.json")}
					autoPlay
					loop
					style={{ width: 200, height: 200 }}
				/>
				<TextButton
					onPress={() => {
						onSubmit()
					}}
					text="Submit"
				/>
			</VStack>
		</Surface>
	)
}

export default UpdateQuiz
