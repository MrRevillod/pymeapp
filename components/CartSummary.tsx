import ViewShot, { captureRef } from "react-native-view-shot"
import { Pressable, StyleSheet, Text, View, Share } from "react-native"

import { useModal } from "@/lib/context/modal"
import { commonStyles } from "@/lib/styles"
import { ProductInCart } from "@/lib/types"

import { FC, useRef } from "react"

import { CartPreview } from "./CartPreview"
import { useAppContext } from "@/lib/context/app"
import { PRIMARY_PURPLE } from "@/lib/utils"

import * as history from "@/lib/actions/history"

export const CartSumary: FC<{ cart: ProductInCart[] }> = ({ cart }) => {
	const { closeModal } = useModal()
	const { cleanCart, total } = useAppContext()

	const viewRef = useRef<ViewShot | null>(null)

	const captureAndShare = async () => {
		try {
			const uri = await captureRef(viewRef, {
				format: "png",
				quality: 0.8,
			})

			await Promise.all([
				Share.share({
					url: uri,
				}),
				history.add(cart, total),
			])

			cleanCart()
		} catch (error) {
			console.error("Error al compartir:", error)
		}
	}

	return (
		<View style={styles.container}>
			<ViewShot
				ref={viewRef}
				options={{
					format: "png",
					quality: 0.8,
				}}
			>
				<CartPreview cart={cart} total={total} />
			</ViewShot>

			<View style={styles.footer}>
				<Pressable
					style={{ ...commonStyles.button, ...styles.secondaryButton }}
					onPress={closeModal}
				>
					<Text style={{ color: PRIMARY_PURPLE, fontWeight: "bold" }}>Volver atrás</Text>
				</Pressable>
				<Pressable
					style={{ ...commonStyles.button, ...styles.primaryButton }}
					onPress={captureAndShare}
				>
					<Text style={{ color: "white", fontWeight: "bold" }}>Compartir</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		gap: 20,
		justifyContent: "center",
	},
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
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 15,
	},
	primaryButton: {
		backgroundColor: PRIMARY_PURPLE,
		flex: 1,
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},
	secondaryButton: {
		backgroundColor: "white",
		flex: 1,
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: PRIMARY_PURPLE,
	},
})
