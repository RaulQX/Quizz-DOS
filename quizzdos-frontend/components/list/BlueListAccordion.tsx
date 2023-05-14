import React from "react"
import { List } from "react-native-paper"
import { listStyles } from "./ListStyles"
import { COLORS } from "palette/colors"

interface ListAccordionProps {
	title: string
	titleStyle?: object
	expanded?: boolean
	onPress: () => void
	children: React.ReactNode
	id: string
	iconPositionOnRight: boolean
}

const BlueListAccordion: React.FC<ListAccordionProps> = ({
	title,
	titleStyle,
	expanded,
	onPress,
	children,
	iconPositionOnRight,
	id,
}) => {
	return (
		<List.Accordion
			key={id}
			id={id}
			style={listStyles.listAccordian}
			title={title}
			titleStyle={titleStyle || listStyles.listAccordianTitle}
			expanded={expanded}
			onPress={onPress}
			right={(props) => (
				<List.Icon
					{...props}
					icon="chevron-down"
					color={COLORS.blue}
					style={!iconPositionOnRight ? { width: 0, height: 0 } : {}}
				/>
			)}
			left={(props) => (
				<List.Icon
					{...props}
					icon="chevron-down"
					color={COLORS.blue}
					style={iconPositionOnRight ? { width: 0, height: 0 } : {}}
				/>
			)}
		>
			{children}
		</List.Accordion>
	)
}

export default BlueListAccordion
