import { COLORS } from "palette/colors"
import React from "react"
import { View, Dimensions } from "react-native"
import { BarChart } from "react-native-chart-kit"

interface GradeChartProps {
	labels: string[]
	grades: number[]
}

const GradeChart = ({ labels, grades }: GradeChartProps) => {
	return (
		<View
			style={{
				backgroundColor: COLORS.blue,
				borderRadius: 20,
				marginTop: 20,
				marginBottom: 20,
				paddingVertical: 15,
				marginRight: 20,
			}}
		>
			<BarChart
				data={{
					labels: labels,
					datasets: [{ data: grades }],
				}}
				style={{ height: 250, borderRadius: 20 }}
				width={Dimensions.get("window").width - 50}
				height={250}
				chartConfig={{
					backgroundGradientFrom: COLORS.blue,
					backgroundGradientTo: COLORS.blue,
					propsForLabels: {
						fontSize: 12,
						fontWeight: "bold",
					},
					decimalPlaces: 2,
					color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
				}}
				fromZero
				showValuesOnTopOfBars
				yAxisSuffix=""
				yAxisLabel=""
				withInnerLines={false}
				withHorizontalLabels={true}
				withVerticalLabels={true}
				verticalLabelRotation={9}
			/>
		</View>
	)
}

export default GradeChart
