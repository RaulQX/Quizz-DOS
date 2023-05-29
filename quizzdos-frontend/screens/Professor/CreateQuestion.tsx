import React, { useEffect, useRef, useState } from "react"
import {
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
} from "react-native"
import {
	Button,
	Checkbox,
	Divider,
	IconButton,
	TextInput,
} from "react-native-paper"
import { IOption, IQuestion } from "interfaces/CourseRelated"
import { COLORS } from "palette/colors"
import { HStack } from "@react-native-material/core"
import TextButton from "components/common/TextButton"

interface CreateQuestionProps {
	question: IQuestion
	removeQuestion: (questionId: string) => void
	updateQuestion: (question: IQuestion) => void
	autoScore: boolean
}

const CreateQuestion = ({
	question,
	removeQuestion,
	updateQuestion,
	autoScore,
}: CreateQuestionProps) => {
	const [prompt, setPrompt] = useState<string>(question.prompt)
	const [options, setOptions] = useState<IOption[]>(question.options)
	const [questionScore, setQuestionScore] = useState<string>(
		question.questionScore.toString()
	)
	const scrollViewRef = useRef<ScrollView>(null)
	const screenHeight = Dimensions.get("window").height

	const [allowTip, setAllowTip] = useState<boolean>(question.tipAllowed)

	useEffect(() => {
		scrollViewRef.current?.scrollToEnd({ animated: true })
	}, [options])

	useEffect(() => {
		setQuestionScore(question.questionScore.toString())
	}, [question.questionScore])
	const totalOptionsScore = options.reduce(
		(total, option) => total + option.scorePercentage,
		0
	)
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
			keyboardVerticalOffset={-300}
		>
			<ScrollView
				ref={scrollViewRef}
				style={{ minHeight: screenHeight * 0.9 }}
			>
				<TextInput
					style={{
						color: COLORS.white,
						fontSize: 20,
						textAlign: "center",
						marginTop: 10,
						backgroundColor: "transparent",
						marginHorizontal: 10,
					}}
					theme={{
						roundness: 20,
						colors: { primary: COLORS.blue },
					}}
					mode="flat"
					multiline
					numberOfLines={2}
					onChangeText={(text) => {
						setPrompt(text)
						updateQuestion({
							...question,
							prompt: text,
						})
					}}
					value={prompt}
					textColor="white"
					placeholder="Question Prompt"
					placeholderTextColor={COLORS.gray}
				/>
				<HStack style={{ width: "100%" }} justify="between">
					<Button
						icon="delete"
						contentStyle={{
							backgroundColor: COLORS.blue,
							flexDirection: "row-reverse",
						}}
						mode="contained"
						onPress={() => {
							removeQuestion(question.id)
						}}
						style={{ alignSelf: "flex-end", margin: 10 }}
					>
						{"Remove Question"}
					</Button>
					<Button
						icon="plus-circle-outline"
						contentStyle={{
							backgroundColor:
								options.length >= 7 ? COLORS.gray : COLORS.blue,
							flexDirection: "row-reverse",
						}}
						mode="contained"
						onPress={() => {
							setOptions([
								...options,
								{
									questionId: question.id,
									text: "",
									scorePercentage: 0,
								},
							])
						}}
						style={{ alignSelf: "flex-start", margin: 10 }}
						disabled={options.length >= 7}
					>
						{"Add Option"}
					</Button>
				</HStack>
				<HStack
					style={{ width: "100%", paddingRight: 15 }}
					justify="between"
					items="center"
				>
					{autoScore === false && (
						<TextInput
							style={{
								color: COLORS.white,
								fontSize: 15,
								textAlign: "center",
								marginTop: 10,
								backgroundColor: "transparent",
								width: "37%",
								marginLeft: 10,
								height: 40,
							}}
							theme={{
								roundness: 20,
								colors: { primary: COLORS.blue },
							}}
							mode="outlined"
							onChangeText={(text) => {
								setQuestionScore(text.replace(/[^0-9]/g, ""))
								updateQuestion({
									...question,
									questionScore: parseInt(text),
								})
							}}
							value={
								questionScore != "0"
									? questionScore.toString()
									: ""
							}
							keyboardType="numeric"
							textColor="white"
							placeholder="Question Score"
							placeholderTextColor={COLORS.gray}
							error={questionScore == "0"}
						/>
					)}

					<HStack
						style={{ flexGrow: 1, marginTop: 15 }}
						justify="end"
					>
						<Text
							style={{
								color: COLORS.white,
								textAlignVertical: "center",
							}}
						>
							{"Allow Tip"}
						</Text>
						<Checkbox
							status={allowTip ? "checked" : "unchecked"}
							onPress={() => {
								setAllowTip(!allowTip)
								updateQuestion({
									...question,
									tipAllowed: !allowTip,
								})
							}}
							theme={{
								colors: {
									primary: COLORS.blue,
								},
							}}
						/>
					</HStack>
				</HStack>
				<Divider style={{ margin: 10 }} />
				<HStack
					style={{ width: "90%", alignSelf: "center" }}
					justify="between"
				>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 20,
							width: "66%",
							textAlign: "center",
						}}
					>
						Answer
					</Text>
					<Text
						style={{
							color: COLORS.white,
							fontSize: 15,
							marginRight: 25,
						}}
					>
						% of score
					</Text>
				</HStack>
				<Divider style={{ margin: 10 }} />
				{options.map((option, index) => {
					return (
						<HStack>
							<TextInput
								style={{
									color: COLORS.white,
									fontSize: 20,
									textAlign: "center",
									marginTop: 10,
									backgroundColor: "transparent",
									marginHorizontal: 10,
									width: "66%",
								}}
								theme={{
									roundness: 20,
									colors: { primary: COLORS.blue },
								}}
								mode="outlined"
								onChangeText={(text) => {
									let newOptions = [...options]
									newOptions[index].text = text
									setOptions(newOptions)
									updateQuestion({
										...question,
										options: newOptions,
									})
								}}
								value={option.text}
								textColor="white"
								error={option.text == ""}
							/>
							<TextInput
								style={{
									color: COLORS.white,
									fontSize: 15,
									textAlign: "center",
									marginTop: 10,
									backgroundColor: "transparent",
									marginHorizontal: 10,
									width: "17%",
								}}
								theme={{
									roundness: 20,
									colors: { primary: COLORS.blue },
								}}
								mode="outlined"
								onChangeText={(text) => {
									let textInt = parseInt(
										text.replace(/[^0-9]/g, "")
									)
                                    
									let newOptions = [...options]
									newOptions[index].scorePercentage = textInt
									setOptions(newOptions)
									updateQuestion({
										...question,
										options: newOptions,
									})
								}}
								value={option.scorePercentage.toString()}
								keyboardType="numeric"
								textColor="white"
								error={totalOptionsScore != 100}
							/>
							<IconButton
								icon="delete"
								onPress={() => {
									let newOptions = [...options]
									newOptions.splice(index, 1)
									setOptions(newOptions)
									updateQuestion({
										...question,
										options: newOptions,
									})
								}}
                                iconColor={COLORS.red}
								style={{ marginTop: 20 }}
							/>
						</HStack>
					)
				})}
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default CreateQuestion
