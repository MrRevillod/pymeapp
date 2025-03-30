import { FC, useState } from "react"
import { Pressable, Text } from "react-native"
import { Show } from "./Show"
import { commonStyles } from "@/lib/styles"
import { ProductInCart } from "@/lib/types"
import { formatChileanPesos } from "@/lib/utils"
import { ProductActionsModal } from "./ProductActionModal"

interface ProductRowProps {
	product: ProductInCart
	showQuantity?: boolean
	onAddToCart?: () => void
	onDelete?: () => void
}

export const ProductRow: FC<ProductRowProps> = ({
	product,
	showQuantity = true,
	onAddToCart,
	onDelete,
}) => {
	const [showActions, setShowActions] = useState(false)

	return (
		<>
			<Pressable style={commonStyles.listItem} onPress={() => setShowActions(true)}>
				<Text style={commonStyles.itemName}>{product.name}</Text>
				<Show when={showQuantity}>
					<Text style={commonStyles.itemQuantity}>{product.quantity}u</Text>
				</Show>
				<Text style={commonStyles.itemPrice}>
					{formatChileanPesos(product.price * (product.quantity ?? 1))}
				</Text>
			</Pressable>

			<ProductActionsModal
				visible={showActions}
				onClose={() => setShowActions(false)}
				onAddToCart={onAddToCart}
				onDelete={onDelete}
			/>
		</>
	)
}
