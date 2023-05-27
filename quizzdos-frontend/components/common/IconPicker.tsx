import React, { useState } from "react"
import { View, Modal, Text, TouchableOpacity, FlatList } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const numColumns = 5
interface IconPickerProps {
	icons: { family: string; icons: string[] }[]
	courseIcon: string
	onSelect: (item: string) => void
}

type IconFamilyMap = {
	[key: string]: typeof MaterialCommunityIcons
}

const familyMap: IconFamilyMap = {
	MaterialCommunityIcons,
}

const IconPicker: React.FC<IconPickerProps> = ({
	icons,
	courseIcon,
	onSelect,
}) => {
	const [visible, setVisible] = useState(false)

	const formatData = (
		data: { family: string; icon: string }[],
		numColumns: number
	) => {
		const numberOfFullRows = Math.floor(data.length / numColumns)

		let numberOfElementsLastRow =
			data.length - numberOfFullRows * numColumns
		while (
			numberOfElementsLastRow !== numColumns &&
			numberOfElementsLastRow !== 0
		) {
			data.push({ family: "", icon: "" })
			numberOfElementsLastRow++
		}

		return data
	}

	const renderItem = ({ item, index }: { item: any; index: number }) => {
		if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />
		}

		const Icon = familyMap[item.family]

		if (!Icon) return <View style={[styles.item, styles.itemInvisible]} />

		return (
			<TouchableOpacity
				style={styles.item}
				onPress={() => {
					onSelect(item.icon)
					setVisible(false)
				}}
			>
				<Icon name={item.icon} size={30} color={COLORS.white} />
			</TouchableOpacity>
		)
	}

	const data: { family: string; icon: string; empty?: boolean }[] = []
	icons.map((i) => {
		const family = i.family
		i.icons.map((j) => {
			const icon = { family, icon: j, empty: false }
			data.push(icon)
		})
	})

	return (
		<>
			<Modal
				animationType="fade"
				transparent={true}
				visible={visible}
				onRequestClose={() => {
					setVisible(false)
				}}
				onDismiss={() => setVisible(false)}
				style={{
					backgroundColor: COLORS.dark,
					height: 200,
					width: 300,
					position: "absolute",
					top: 200,
					left: 50,
					padding: 20,
				}}
			>
				<View style={styles.wrapper}>
					<View style={styles.content}>
						<Text style={styles.title}>{"Choose"}</Text>
						<View>
							<FlatList
								data={formatData(data, numColumns)}
								renderItem={renderItem}
								numColumns={numColumns}
								keyExtractor={(_, index) => `item-${index}`}
								style={{ overflow: "scroll" }}
							/>
						</View>
					</View>
				</View>
			</Modal>
			<IconButton
				icon={courseIcon}
				style={{
					backgroundColor: COLORS.blue,
					borderColor: COLORS.white,
					borderWidth: 1,
				}}
				onPress={() => setVisible(true)}
				iconColor={COLORS.white}
			/>
		</>
	)
}

export default IconPicker
import { StyleSheet } from "react-native"
import { COLORS } from "palette/colors"
import TextButton from "components/common/TextButton"
import { Button, IconButton } from "react-native-paper"
import { set } from "react-native-reanimated"

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.dark,
		flex: 1,
	},
	title: {
		color: COLORS.white,
		fontSize: 18,
		fontWeight: "700",
		textAlignVertical: "center",
		textAlign: "center",
		marginBottom: 15,
	},
	content: {
		flexDirection: "column",
		backgroundColor: COLORS.dark,
		maxHeight: "80%",
		borderRadius: 5,
		width: "80%",
		padding: 20,
	},
	wrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.7)",
	},
	listContainer: {
		flex: 1,
		marginVertical: 20,
	},
	item: {
		backgroundColor: COLORS.dark,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		margin: 3,
		height: 50,
		borderWidth: 1,
		borderColor: COLORS.blue,
		borderRadius: 10,
	},
	itemInvisible: {
		backgroundColor: "transparent",
		borderWidth: 0,
	},
	itemText: {
		color: COLORS.blue,
	},
})
