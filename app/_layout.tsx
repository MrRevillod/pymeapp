import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { useEffect } from "react"

import { AppProvider } from "@/lib/context/cart"
import { initDatabase } from "@/lib/db"
import { ModalProvider } from "@/lib/context/modal"

import FontAwesome from "@expo/vector-icons/FontAwesome"
import * as SplashScreen from "expo-splash-screen"

export const unstable_settings = {
	initialRouteName: "(tabs)",
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	})

	useEffect(() => {
		if (error) throw error
		;(async () => await initDatabase())()
	}, [error])

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync()
	}, [loaded])

	if (!loaded) return null

	return <RootLayoutNav />
}

function RootLayoutNav() {
	return (
		<AppProvider>
			<ModalProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="modal" options={{ headerShown: false }} />
				</Stack>
			</ModalProvider>
		</AppProvider>
	)
}
