import { View } from "react-native"
import { Text } from "@react-native-material/core"
import { COLORS } from "palette/colors"

const Logo = () => {
	return (
		<View style={{ display: "flex", flexDirection: "column", width: "50%" }}>
			<Text variant="h3" color={COLORS.white} style={{fontWeight: "500", textAlign: "left"}}>
				Quizz
			</Text>
			<Text variant="h3" color={COLORS.blue} style={{fontWeight: "500", textAlign: "right"}}>
				Dos
			</Text>
		</View>
	)
}
export default Logo
