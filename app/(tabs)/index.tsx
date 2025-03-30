import { Cart } from "@/components/Cart"
import { Pressable, StyleSheet, View, Text, Alert } from "react-native"

import { useModal } from "@/lib/context/modal"
import { CartSumary } from "@/components/CartSummary"
import { useAppContext } from "@/lib/context/cart"
import { PRIMARY_PURPLE } from "@/lib/utils"

const { alert } = Alert

export default function CartScreen() {
	const { openModal } = useModal()
	const { cancelAttention, cart } = useAppContext()

	const handleEndAttention = async () => {
		if (cart.length === 0) {
			return alert("No hay productos en el carrito")
		}

		openModal({ content: <CartSumary cart={cart} />, title: "Resumen de la atención" })
	}

	const handleCancelAttention = () => {
		cancelAttention()
	}

	return (
		<View style={styles.container}>
			<Cart />
			<View style={styles.footer}>
				<Pressable
					style={{ ...styles.secondaryButton }}
					onPress={() => handleCancelAttention()}
				>
					<Text style={{ color: PRIMARY_PURPLE, fontWeight: "bold" }}>
						Cancelar atención
					</Text>
				</Pressable>
				<Pressable style={{ ...styles.primaryButton }} onPress={() => handleEndAttention()}>
					<Text style={{ color: "white", fontWeight: "bold" }}>Finalizar</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#F5F5F5",
		height: "100%",
		padding: 20,
	},
	footer: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		gap: "4%",
	},
	primaryButton: {
		backgroundColor: PRIMARY_PURPLE,
		width: "48%",
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		marginTop: 10,
	},
	secondaryButton: {
		backgroundColor: "#F5F5F5",
		width: "48%",
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		marginTop: 10,
		borderWidth: 1,
		borderColor: PRIMARY_PURPLE,
	},
})
