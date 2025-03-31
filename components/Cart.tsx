import { commonStyles } from "@/lib/styles"
import { useAppContext } from "@/lib/context/app"
import { PRIMARY_PURPLE, formatChileanPesos } from "@/lib/utils"

import { ProductRow } from "./ProductRow"
import { StyleSheet, View, Text, FlatList, Pressable, Alert } from "react-native"

export const Cart = () => {
	const { cart, cleanCart, removeProductFromCart } = useAppContext()

	const handleCleanCart = () => {
		if (cart.length === 0) {
			return Alert.alert("Carrito vacío", "No hay productos en el carrito")
		}

		Alert.alert("Limpiar carrito", "¿Estás seguro de que deseas limpiar el carrito?", [
			{
				text: "Cancelar",
				onPress: () => {},
				style: "cancel",
			},
			{
				text: "Limpiar",
				onPress: () => cleanCart(),
			},
		])
	}

	const handleDropProduct = (productId: string) => {
		removeProductFromCart(productId)
	}

	return (
		<View style={commonStyles.container}>
			<View style={commonStyles.header}>
				<Text style={commonStyles.headerText}>Carrito</Text>
			</View>
			<FlatList
				data={cart}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={() => (
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							bottom: 100,
							top: 200,
						}}
					>
						<Text>No hay productos en el carrito</Text>
					</View>
				)}
				renderItem={({ item }) => (
					<ProductRow
						product={item}
						showQuantity={true}
						onDelete={() => handleDropProduct(item.id)}
					/>
				)}
			/>
			<View style={commonStyles.totalContainer}>
				<Text style={commonStyles.totalText}>Total:</Text>
				<Text style={commonStyles.totalPrice}>
					{formatChileanPesos(
						cart.reduce((total, item) => total + item.price * item.quantity, 0)
					)}
				</Text>
			</View>

			<Pressable onPress={() => handleCleanCart()} style={styles.cleanCartButton}>
				<Text style={styles.buttonTextSecondary}>Limpiar carrito</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	buttonTextSecondary: {
		color: PRIMARY_PURPLE,
		fontSize: 16,
		fontWeight: "bold",
	},
	cleanCartButton: {
		backgroundColor: "#FFF",
		width: "100%",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		marginTop: 25,
		borderColor: PRIMARY_PURPLE,
		borderWidth: 1,
	},
})
