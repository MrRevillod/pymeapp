import { Show } from "./Show"
import { FC, useEffect, useRef } from "react"
import { Modal, Pressable, StyleSheet, Text, View, Animated, Easing } from "react-native"

interface ProductActionsModalProps {
	visible: boolean
	onClose: () => void
	onAddToCart?: () => void
	onDelete?: () => void
}

export const ProductActionsModal: FC<ProductActionsModalProps> = ({
	visible,
	onClose,
	onAddToCart,
	onDelete,
}) => {
	const fadeAnim = useRef(new Animated.Value(0)).current
	const scaleAnim = useRef(new Animated.Value(0.95)).current

	useEffect(() => {
		if (visible) {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 200,
					easing: Easing.out(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 200,
					easing: Easing.out(Easing.ease),
					useNativeDriver: true,
				}),
			]).start()
		} else {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}).start()
		}
	}, [visible])

	return (
		<Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
			<Pressable style={styles.modalOverlay} onPress={onClose}>
				<Animated.View
					style={[
						styles.modalContainer,
						{
							opacity: fadeAnim,
							transform: [{ scale: scaleAnim }],
						},
					]}
				>
					<Show when={!!onAddToCart}>
						<Pressable
							style={[styles.actionButton, styles.addButton]}
							onPress={() => {
								onAddToCart?.()
								onClose()
							}}
						>
							<Text style={styles.actionText}>Agregar al carrito</Text>
						</Pressable>
					</Show>

					<Show when={!!onAddToCart && !!onDelete}>
						<View style={styles.divider} />
					</Show>

					<Show when={!!onDelete}>
						<Pressable
							style={[styles.actionButton, styles.deleteButton]}
							onPress={() => {
								onDelete?.()
								onClose()
							}}
						>
							<Text style={[styles.actionText, styles.deleteText]}>
								Eliminar producto
							</Text>
						</Pressable>
					</Show>
				</Animated.View>
			</Pressable>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	modalContainer: {
		width: "80%",
		backgroundColor: "white",
		borderRadius: 12,
		paddingVertical: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	actionButton: {
		paddingVertical: 16,
		paddingHorizontal: 20,
	},
	addButton: {
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	deleteButton: {
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12,
	},
	actionText: {
		fontSize: 16,
		textAlign: "center",
	},
	deleteText: {
		color: "#d32f2f",
		fontWeight: "600",
	},
	divider: {
		height: 1,
		backgroundColor: "#f0f0f0",
		marginVertical: 4,
	},
})
