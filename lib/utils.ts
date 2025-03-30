export const PRIMARY_PURPLE = "#6300a6"

import { randomUUID } from "expo-crypto"

export const formatChileanPesos = (amount: number) => {
	return new Intl.NumberFormat("es-CL", {
		style: "currency",
		currency: "CLP",
	}).format(amount)
}

export const generateId = () => {
	return randomUUID()
}

export const formatDate = (date: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}

	const formattedDate = new Date(date).toLocaleString("es-CL", options)
	return formattedDate
}
