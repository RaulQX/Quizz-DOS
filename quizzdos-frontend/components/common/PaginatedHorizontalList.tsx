import React, {
	useRef,
	useState,
	FC,
	useImperativeHandle,
	forwardRef,
	useEffect,
} from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { COLORS } from "palette/colors"
import { Dimensions } from "react-native"
import { ActivityIndicator } from "react-native-paper"

interface MenuItemProps {
	children: JSX.Element
	onPress: () => void
	active: boolean
}

const MenuItem: FC<MenuItemProps> = ({ children, onPress, active }) => {
	return (
		<Pressable
			style={[
				styles.menuItemContainer,
				{
					borderBottomWidth: active ? 1 : 0,
					height: 10,
					width: 10,
					opacity: active ? 1 : 0.2,
				},
			]}
			onPress={onPress}
			hitSlop={10}
		>
			{children}
		</Pressable>
	)
}

interface Props {
	children: JSX.Element[]
	navItems: JSX.Element[]
}

const PaginatedHorizontalList = forwardRef<any, Props>(
	({ children, navItems }, ref) => {
		const [activeIndex, setActiveIndex] = useState(0)
		const [isScrolling, setIsScrolling] = useState(false)
		const scrollRef = useRef<ScrollView>(null)

		const onPress = (targetIndex: number) => () => {
			scrollRef.current?.scrollTo({
				x: Dimensions.get("window").width * targetIndex,
				animated: true,
			})
			setActiveIndex(targetIndex)
		}

		const onMomentumScrollEnd = (e: any) => {
			const { nativeEvent } = e
			const index = Math.round(
				nativeEvent.contentOffset.x / Dimensions.get("window").width
			)
			setActiveIndex(index)
			setIsScrolling(false)
		}

		useImperativeHandle(ref, () => ({
			scrollTo: (x: number) => {
				setIsScrolling(true)
				scrollRef.current?.scrollTo({
					x: x,
					animated: true,
				})
				setActiveIndex(Math.round(x / Dimensions.get("window").width))
			},
		}))

		return (
			<View style={styles.container}>
				<View style={styles.navContainer}>
					{navItems.map((icon, index) => (
						<MenuItem
							children={icon}
							active={activeIndex === index}
							onPress={onPress(index)}
							key={index}
						/>
					))}
				</View>
				<ScrollView
					horizontal
					pagingEnabled
					nestedScrollEnabled
					onMomentumScrollEnd={onMomentumScrollEnd}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					ref={scrollRef}
				>
					{children.map((child, index) => (
						<View style={styles.childrenContainer} key={index}>
							{child}
						</View>
					))}
				</ScrollView>
			</View>
		)
	}
)

export default PaginatedHorizontalList
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	childrenContainer: {
		width: Dimensions.get("window").width,
	},
	navContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingBottom: 5,
	},
	menuItemContainer: {
		borderBottomColor: COLORS.white,
		paddingBottom: 5,
	},
	menuItemText: {
		fontSize: 10,
		color: COLORS.gray,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
})
