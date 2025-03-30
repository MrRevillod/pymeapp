import { Product, ProductInCart } from "../types"
import { useContext, createContext, ReactNode, useState, useEffect } from "react"

interface AppContextType {
	cart: ProductInCart[]
	total: number
	cancelAttention: () => void
	addProductToCart: (product: Product) => void
	removeProductFromCart: (productId: string) => void
	cleanCart: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<ProductInCart[]>([])
	const [total, setTotal] = useState<number>(0)

	const addProductToCart = (product: Product) => {
		const index = cart.findIndex((item) => item.id === product.id)

		if (index === -1) {
			setCart([...cart, { ...product, quantity: 1 }])
		} else {
			const updatedCart = [...cart]
			updatedCart[index].quantity += 1
			setCart(updatedCart)
		}
	}

	const removeProductFromCart = (productId: string) => {
		const existing = cart.find((item) => item.id === productId)
		if (!existing) return

		if (existing.quantity === 1) {
			setCart(cart.filter((item) => item.id !== productId))
		} else {
			const updatedCart = cart.map((item) =>
				item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
			)
			setCart(updatedCart)
		}
	}

	const cleanCart = () => {
		setCart([])
		setTotal(0)
	}

	const cancelAttention = () => {
		cleanCart()
		setTotal(0)
	}

	useEffect(() => {
		const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
		setTotal(newTotal)
	}, [cart])

	return (
		<AppContext.Provider
			value={{
				cart,
				total,
				addProductToCart,
				removeProductFromCart,
				cleanCart,
				cancelAttention,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider")
	}
	return context
}
