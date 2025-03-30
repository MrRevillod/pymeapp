import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { FC, Dispatch, SetStateAction } from "react"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"

import { Input } from "@/components/Input"

import { useModal } from "@/lib/context/modal"
import { generateId, PRIMARY_PURPLE } from "@/lib/utils"
import { Category, ProductFormSchema, ProductFormValues } from "@/lib/types"

import * as products from "@/lib/actions/products"
import * as categories from "@/lib/actions/categories"

interface AddProductProps {
	setData: Dispatch<SetStateAction<Category[] | null>>
}

export const AddProduct: FC<AddProductProps> = ({ setData }) => {
	const { data: modalData, closeModal } = useModal()

	const formMethods = useForm<ProductFormValues>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: {
			name: "",
			price: null as any,
			categoryId: modalData?.category?.id,
		},
	})

	const { handleSubmit } = formMethods

	const onSubmit = async (values: ProductFormValues) => {
		const product = {
			...values,
			id: generateId(),
		}

		try {
			await products.add(product)
			const allProducts = await categories.get()
			setData([...allProducts])
		} catch (error: any) {
			Alert.alert("Error", error?.message ?? "Ha ocurrido un error")
		}

		closeModal()
	}

	return (
		<View style={styles.container}>
			<View style={{ gap: 10 }}>
				<Text style={{ fontSize: 24, fontWeight: "bold" }}>Categoría:</Text>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "semibold",
						color: "#666",
					}}
				>
					{modalData?.category?.name}
				</Text>
			</View>
			<View style={styles.form}>
				<FormProvider {...formMethods}>
					<Input
						label="Nombre del producto"
						name="name"
						placeholder="Nombre del producto"
						keyboardType="default"
						secureTextEntry={false}
					/>
					<Input
						label="Precio (CLP)"
						name="price"
						placeholder="10000"
						keyboardType="numeric"
						secureTextEntry={false}
					/>

					<View style={{ marginTop: 10, gap: 10 }}>
						<Pressable
							style={styles.primaryButton}
							onPress={() => handleSubmit(onSubmit)()}
						>
							<Text style={{ color: "#fff", fontSize: 16, fontWeight: "semibold" }}>
								Añadir producto
							</Text>
						</Pressable>
						<Pressable style={styles.secondaryButton} onPress={() => closeModal()}>
							<Text
								style={{
									color: PRIMARY_PURPLE,
									fontSize: 16,
									fontWeight: "semibold",
								}}
							>
								Volver
							</Text>
						</Pressable>
					</View>
				</FormProvider>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		width: "100%",
		height: "100%",
		borderRadius: 10,
		padding: 20,
		gap: 20,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: 20,
	},
	primaryButton: {
		backgroundColor: PRIMARY_PURPLE,
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},
	secondaryButton: {
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		marginTop: 10,
		borderWidth: 1,
		borderColor: PRIMARY_PURPLE,
	},
})
