import { query } from "@/lib/db"
import { Category } from "@/lib/types"

const get = async (): Promise<Category[]> => {
    try {
        const result = await query<any>(`
			SELECT 
				categories.id AS categoryId,
				categories.name AS categoryName,
				products.id AS productId,
				products.name AS productName,
				products.price AS productPrice
			FROM 
				categories
			LEFT JOIN 
				products 
			ON 
				categories.id = products.categoryId;
		`)

        const categories = new Map<string, Category>()

        for (const row of result) {
            if (!categories.has(row.categoryId)) {
                categories.set(row.categoryId, {
                    id: row.categoryId,
                    name: row.categoryName,
                    products: [],
                })
            }

            if (row.productId) {
                const category = categories.get(row.categoryId)!
                category?.products?.push({
                    id: row.productId,
                    name: row.productName,
                    price: row.productPrice,
                    categoryId: row.categoryId,
                })
            }
        }

        return Array.from(categories.values())
    } catch (error: any) {
        throw new Error(error?.message ?? "Error al obtener las categorías")
    }
}

const add = async (value: Category): Promise<void> => {
    try {
        return await query(`
            INSERT INTO categories (id, name) 
            VALUES ('${value.id}', '${value.name}')
        `)
    } catch (error: any) {
        throw new Error(error?.message ?? "Error al agregar una categoría")
    }
}

const remove = async (id: string): Promise<void> => {
    try {
        await query(`DELETE FROM categories WHERE id = '${id}'`)
    } catch (error: any) {
        throw new Error(error?.message ?? "Error al eliminar un producto")
    }
}

export { get, add, remove }
