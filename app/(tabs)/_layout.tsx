import React from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"

import { Tabs } from "expo-router"
import { Header } from "@/components/Header"
import { FontAwesome5 } from "@expo/vector-icons"
import { PRIMARY_PURPLE } from "@/lib/utils"

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"] }) {
	return (
		<FontAwesome5
			size={28}
			style={{ marginBottom: -20, color: PRIMARY_PURPLE }}
			name={props.name}
		/>
	)
}

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: true }}>
			<Tabs.Screen
				name="history"
				options={{
					header: () => <Header title="Historial" />,
					tabBarIcon: () => <TabBarIcon name="book" />,
					tabBarLabel: () => null,
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					header: () => <Header title="Carrito de la atención" />,
					tabBarIcon: () => <TabBarIcon name="shopping-cart" />,
					tabBarLabel: () => null,
				}}
			/>
			<Tabs.Screen
				name="products"
				options={{
					header: () => <Header title="Categorías y productos" />,
					tabBarIcon: () => <TabBarIcon name="archive" />,
					tabBarLabel: () => null,
				}}
			/>
		</Tabs>
	)
}
