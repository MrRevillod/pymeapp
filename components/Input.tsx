import { PRIMARY_PURPLE } from "@/lib/utils"
import { Controller, useFormContext } from "react-hook-form"

import { StyleSheet, Text } from "react-native"
import { View, TextInput, KeyboardTypeAndroid, KeyboardType } from "react-native"

interface InputFieldProps {
	label: string
	name: string
	placeholder: string
	secureTextEntry?: boolean
	keyboardType?: KeyboardType | KeyboardTypeAndroid
	maxLength?: number
	autoFocus?: boolean
}

export const Input = ({ name, ...props }: InputFieldProps) => {
	const {
		label,
		placeholder,
		secureTextEntry,
		keyboardType = "default",
		maxLength,
		autoFocus = false,
	} = props

	const {
		control,
		formState: { errors },
	} = useFormContext()

	const styles = StyleSheet.create({
		textContainer: {
			marginBottom: errors[name] ? 10 : 0,
		},
		label: {
			color: PRIMARY_PURPLE,
			fontSize: 17,
			fontWeight: "bold",
		},
		error: {
			color: "red",
			fontSize: 14,
			fontWeight: "bold",
		},
		input: {
			backgroundColor: "white",
			borderRadius: 10,
			borderColor: errors[name] ? "red" : PRIMARY_PURPLE,
			borderWidth: 1.5,
			paddingVertical: 10,
			width: "auto",
			textAlign: "left",
			fontSize: 18,
			paddingLeft: 15,
		},
	})

	return (
		<View>
			<View style={styles.textContainer}>
				<Text style={styles.label}>{label}</Text>
				<Text style={styles.error}>{errors[name]?.message?.toString()}</Text>
			</View>

			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						placeholder={placeholder}
						value={value}
						onBlur={onBlur}
						onChangeText={onChange}
						secureTextEntry={secureTextEntry}
						keyboardType={keyboardType}
						placeholderTextColor="#d4d3cf"
						maxLength={maxLength || 100}
						autoFocus={autoFocus}
					/>
				)}
			/>
		</View>
	)
}
