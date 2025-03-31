import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { FC, Dispatch, SetStateAction } from "react"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"

import { Input } from "@/components/Input"

import { useModal } from "@/lib/context/modal"
import { generateId, PRIMARY_PURPLE } from "@/lib/utils"
import { Category, CategoryFormValues, CategoryFormSchema } from "@/lib/types"

import * as categories from "@/lib/actions/categories"

interface AddCategoryProps {
	setData: Dispatch<SetStateAction<Category[] | null>>
}

export const AddCategory: FC<AddCategoryProps> = ({ setData }) => {
	const { closeModal } = useModal()

	const formMethods = useForm<CategoryFormValues>({
		resolver: zodResolver(CategoryFormSchema),
		defaultValues: { name: "" },
	})

	const { handleSubmit } = formMethods

	const onSubmit = async (values: CategoryFormValues) => {
		const category = {
			...values,
			id: generateId(),
		}

		try {
			await categories.add(category)
			setData([...(await categories.get())])
		} catch (error: any) {
			Alert.alert("Error", error?.message ?? "Ha ocurrido un error")
		}

		closeModal()
	}

	return (
		<View style={styles.container}>
			<View style={{ gap: 10 }}>
				<Text style={{ fontSize: 24, fontWeight: "bold" }}>Añadir una categoría</Text>
			</View>
			<View style={styles.form}>
				<FormProvider {...formMethods}>
					<Input
						label="Nombre de la categoría"
						name="name"
						placeholder="Nombre de la categoría"
						keyboardType="default"
						secureTextEntry={false}
					/>

					<View style={{ marginTop: 10, gap: 10 }}>
						<Pressable
							style={styles.primaryButton}
							onPress={() => handleSubmit(onSubmit)()}
						>
							<Text style={{ color: "#fff", fontSize: 16, fontWeight: "semibold" }}>
								Añadir categoría
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
		padding: 40,
		gap: 20,
		justifyContent: "center",
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
