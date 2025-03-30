import { FontAwesome6 } from "@expo/vector-icons"

import { useModal } from "@/lib/context/modal"
import { commonStyles } from "@/lib/styles"
import { useAppContext } from "@/lib/context/cart"
import { Category, Product, ProductInCart } from "@/lib/types"

import * as products from "@/lib/actions/products"
import * as categories from "@/lib/actions/categories"

import { ProductRow } from "@/components/ProductRow"
import { AddProduct } from "@/components/forms/AddProduct"
import { AddCategory } from "@/components/forms/AddCategory"

import { useEffect, useState } from "react"
import { Text, FlatList, View, Pressable, Alert, StyleSheet } from "react-native"

export default function ProductScreen() {
	const [categoriesList, setCategoriesList] = useState<Category[] | null>(null)

	useEffect(() => {
		categories.get().then((data: Category[]) => setCategoriesList(data))
	}, [])

	const { openModal } = useModal()
	const { addProductToCart } = useAppContext()

	const handleAddProductToCart = (product: Product) => {
		addProductToCart(product)
	}

	const handleAddProductToCategory = (category: Category) => {
		openModal({
			title: "Agregar producto",
			content: <AddProduct setData={setCategoriesList} />,
			data: { category },
		})
	}

	const handleAddCategory = () => {
		openModal({
			title: "Agregar categoría",
			content: <AddCategory setData={setCategoriesList} />,
		})
	}

	const handleDeleteCategory = (category: Category) => {
		Alert.alert(
			"Eliminar categoría",
			"Si eliminas esta categoría, todos los productos asociados a ella serán eliminados. ¿Estás seguro de que deseas continuar?",
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Eliminar",
					onPress: async () => {
						await categories.remove(category.id)
						setCategoriesList(await categories.get())
					},
				},
			]
		)
	}

	const handleDeleteProduct = async (product: Product) => {
		Alert.alert("Eliminar producto", "¿Estás seguro de que deseas eliminar este producto?", [
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Eliminar",
				onPress: async () => {
					await products.remove(product.id)
					setCategoriesList([...(await categories.get())])
				},
			},
		])
	}

	return (
		<View style={styles.container}>
			<View style={commonStyles.container}>
				<FlatList
					data={categoriesList}
					keyExtractor={(item) => item.id}
					renderItem={({ item: category }) => (
						<View
							style={[
								{ marginBottom: 20 },
								category.products?.length === 0 && { minHeight: 100 },
							]}
						>
							<View style={commonStyles.header}>
								<Text style={commonStyles.headerText}>{category.name}</Text>
								<View
									style={{
										flexDirection: "row",
										gap: 10,
										alignItems: "center",
										justifyContent: "flex-end",
									}}
								>
									<Pressable
										style={[
											commonStyles.button,
											{ height: 30, width: 30, backgroundColor: "#bf0020" },
										]}
										onPress={() => handleDeleteCategory(category)}
									>
										<FontAwesome6 name="trash" size={16} color="#fff" />
									</Pressable>
									<Pressable
										onPress={() => handleAddProductToCategory(category)}
										style={[commonStyles.button, { height: 30, width: 30 }]}
									>
										<FontAwesome6 name="plus" size={16} color="#FFF" />
									</Pressable>
								</View>
							</View>
							{category.products && category.products?.length > 0 ? (
								<FlatList
									data={category.products}
									keyExtractor={(product) => product.id}
									renderItem={({ item: product }) => (
										<ProductRow
											product={product as ProductInCart}
											showQuantity={false}
											onAddToCart={() => handleAddProductToCart(product)}
											onDelete={() => handleDeleteProduct(product)}
										/>
									)}
									showsVerticalScrollIndicator={false}
								/>
							) : (
								<Text style={{ color: "#666666", marginTop: 10 }}>
									No hay productos en esta categoría.
								</Text>
							)}
						</View>
					)}
					showsVerticalScrollIndicator={false}
				/>
				<View style={commonStyles.floatingButtonContainer}>
					<Pressable
						onPress={() => handleAddCategory()}
						style={[commonStyles.button, { height: 55, width: 55 }]}
					>
						<FontAwesome6 name="plus" size={20} color="#FFF" />
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "#F5F5F5",
		height: "100%",
		padding: 20,
	},
})
