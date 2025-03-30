import { FC } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

import { ProductRow } from "./ProductRow"
import { commonStyles } from "@/lib/styles"
import { ProductInCart } from "@/lib/types"
import { formatChileanPesos } from "@/lib/utils"

interface CartPreviewProps {
	cart: ProductInCart[]
	total: number
}

export const CartPreview: FC<CartPreviewProps> = ({ cart, total }) => {
	return (
		<View style={styles.cartContainer}>
			<View style={commonStyles.header}>
				<Text style={commonStyles.headerText}>Resumen de la atención</Text>
			</View>

			<FlatList
				data={cart}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<ProductRow
						product={item}
						showQuantity={true}
						onAddToCart={() => {}}
						onDelete={() => {}}
					/>
				)}
			/>

			<View style={commonStyles.totalContainer}>
				<Text style={commonStyles.totalText}>Total:</Text>
				<Text style={commonStyles.totalPrice}>{formatChileanPesos(total)}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cartContainer: {
		width: "100%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginBottom: 20,
	},
	listContent: {
		paddingBottom: 20,
	},
})
