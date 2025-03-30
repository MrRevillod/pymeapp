import { useEffect, useState } from "react"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"

import { commonStyles } from "@/lib/styles"
import { formatChileanPesos, formatDate } from "@/lib/utils"

import * as history from "@/lib/actions/history"

import { ProductRow } from "@/components/ProductRow"

export default function HistoryScreen() {
	const [historyList, setHistoryList] = useState<any[]>([])
	const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

	useEffect(() => {
		history.get().then((data: any[]) => setHistoryList(data))
	}, [])

	const toggleExpand = (id: string) => {
		setExpandedItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	return (
		<View style={styles.container}>
			<View style={commonStyles.container}>
				<FlatList
					data={historyList}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Pressable style={styles.card} onPress={() => toggleExpand(item.id)}>
							<View style={styles.cardHeader}>
								<View style={styles.headerRow}>
									<Text style={styles.headerLabel}>Fecha: </Text>
									<Text style={styles.headerValue}>
										{formatDate(item.createdAt)}
									</Text>
								</View>

								<View style={styles.headerRow}>
									<Text style={styles.headerLabel}>Total: </Text>
									<Text style={styles.headerValue}>
										{formatChileanPesos(item.total)}
									</Text>
								</View>
								<View style={styles.divider} />
							</View>

							{expandedItems[item.id] && (
								<View style={styles.cartContainer}>
									<FlatList
										data={item.cart}
										showsVerticalScrollIndicator={false}
										keyExtractor={(product) => product.id}
										renderItem={({ item: product }) => (
											<ProductRow
												product={product}
												showQuantity={true}
												onAddToCart={() => {}}
												onDelete={() => {}}
											/>
										)}
										nestedScrollEnabled={true}
									/>
								</View>
							)}
						</Pressable>
					)}
				/>
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
	card: {
		borderRadius: 10,
		marginBottom: 15,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
		overflow: "hidden",
	},
	cardHeader: {
		padding: 15,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	headerLabel: {
		fontWeight: "bold",
		fontSize: 16,
	},
	headerValue: {
		fontSize: 16,
		marginLeft: 8,
	},
	cartContainer: {
		paddingHorizontal: 15,
		paddingBottom: 15,
	},
	divider: {
		height: 1,
		backgroundColor: "#b1b1b1",
		marginVertical: 8,
	},
})
