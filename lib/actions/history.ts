import { query } from "../db"
import { generateId } from "../utils"
import { ProductInCart } from "../types"

const get = async () => {
	try {
		const result: any = await query(`SELECT * FROM history ORDER BY createdAt DESC`)

		const purchases = result.map((row: any) => ({
			id: row.id,
			cart: JSON.parse(row.cart),
			total: row.total,
			createdAt: row.createdAt,
		}))

		return purchases
	} catch (error: any) {
		throw new Error(error?.message ?? "Error al obtener el historial de compras")
	}
}

const add = async (cart: ProductInCart[], total: number) => {
	try {
		const purchase = {
			id: generateId(),
			total,
			cart: JSON.stringify(cart),
			createdAt: new Date().toISOString(),
		}

		await query(`
            INSERT INTO history (id, cart, total, createdAt)
            VALUES ('${purchase.id}', '${purchase.cart}', ${purchase.total}, '${purchase.createdAt}')
        `)
	} catch (error) {
		console.error("Error al agregar la compra:", error)
		throw new Error("Error al agregar la compra")
	}
}

export { get, add }
