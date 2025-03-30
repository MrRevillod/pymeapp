import { query } from "@/lib/db"
import { Product } from "@/lib/types"

const get = async (): Promise<Product[]> => {
	try {
		return await query<Product[]>("SELECT * FROM products")
	} catch (error: any) {
		throw new Error(error?.message ?? "Error al obtener los productos")
	}
}

const getByCategory = async (categoryId: string): Promise<Product[]> => {
	try {
		return await query<Product[]>(`SELECT * FROM products WHERE categoryId = '${categoryId}'`)
	} catch (error: any) {
		throw new Error(error?.message ?? "Error al obtener los productos por categoría")
	}
}

const add = async (product: Product): Promise<void> => {
	try {
		await query(`
            INSERT INTO products (id, name, price, categoryId) 
            VALUES ('${product.id}', '${product.name}', ${product.price}, '${product.categoryId}')
        `)
	} catch (error: any) {
		throw new Error(error?.message ?? "Error al agregar un producto")
	}
}

const remove = async (productId: string): Promise<void> => {
	try {
		await query(`DELETE FROM products WHERE id = '${productId}'`)
	} catch (error: any) {
		throw new Error(error?.message ?? "Error al eliminar un producto")
	}
}

export { get, add, remove, getByCategory }
