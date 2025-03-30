import { StyleSheet } from "react-native"
import { PRIMARY_PURPLE } from "@/lib/utils"

export const commonStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#FFF",
		borderRadius: 10,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333333",
	},
	listItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
	},
	itemName: {
		flex: 2,
		fontSize: 16,
		color: "#333333",
		textAlign: "left",
	},
	itemQuantity: {
		flex: 1,
		fontSize: 16,
		color: "#666666",
		textAlign: "center",
	},
	itemPrice: {
		flex: 1,
		fontSize: 16,
		color: "#333333",
		textAlign: "right",
	},
	totalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: "#E0E0E0",
	},
	totalText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333333",
	},
	totalPrice: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333333",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		backgroundColor: PRIMARY_PURPLE,
	},
	floatingButtonContainer: {
		position: "absolute",
		bottom: 20,
		right: 20,
	},
})
