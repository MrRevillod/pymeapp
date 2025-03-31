import { number, object, string, TypeOf, coerce, array } from "zod"

// Product Schemas and Types --------------------------------------

export const ProductSchema = object({
	id: string(),
	name: string(),
	price: number().min(1),
	categoryId: string(),
})

export const ProductFormSchema = object({
	name: string({ message: "El nombre del producto es requerido" }),
	price: coerce
		.number({ message: "El precio debe ser númerico" })
		.min(1, { message: "El precio del producto debe ser mayor a 0" }),
	categoryId: string({ message: "La categoría del producto es requerida" }),
})

export type ProductFormValues = TypeOf<typeof ProductFormSchema>
export type Product = TypeOf<typeof ProductSchema>

export type ProductInCart = Product & {
	quantity: number
}

// Category Schemas and Types --------------------------------------

export const CategorySchema = object({
	id: string(),
	name: string(),
})

export const CategoryFormSchema = object({
	name: string({ message: "El nombre de la categoría es requerido" }),
})

export type CategoryFormValues = TypeOf<typeof CategoryFormSchema>

export type Category = TypeOf<typeof CategorySchema> & {
	products?: Product[]
}

// Phone Schemas ---------------------------------------------------

export const PhoneNumberSchema = object({
	phone: string({ message: "El número de teléfono debe ser un número de 9 dígitos" })
		.min(9, { message: "El número de teléfono debe tener 9 dígitos" })
		.max(9, { message: "El número de teléfono debe tener 9 dígitos" })
		.regex(/^9\d{8}$/, { message: "El número de teléfono debe comenzar con 9" }),
})

export type PhoneNumberFormValues = TypeOf<typeof PhoneNumberSchema>

// Utility Types -------------------------------------------------

export type Fn<T, F = any> = ({ ...props }: T) => F

// History Schemas and Types ---------------------------------

export const HistorySchema = object({
	id: string(),
	cart: array(ProductSchema),
	total: number(),
	createdAt: string(),
})

export type History = TypeOf<typeof HistorySchema>
