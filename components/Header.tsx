import { FC } from "react"
import { PRIMARY_PURPLE } from "@/lib/utils"
import { Platform, StyleSheet, Text, View } from "react-native"

export const Header: FC<{ title: string }> = ({ title }) => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		padding: 20,
		height: 150,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: Platform.OS === "ios" ? 60 : 0,
		backgroundColor: PRIMARY_PURPLE,
		borderRadius: 10,
	},
	headerText: {
		color: "#F5F5F5",
		fontSize: 22,
		fontWeight: "bold",
	},
})
