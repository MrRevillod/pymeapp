import { useModal } from "@/lib/context/modal"
import { View, StyleSheet } from "react-native"

export default function ModalView() {
	const { content } = useModal()
	return <View style={styles.container}>{content}</View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "#F5F5F5",
	},
})
