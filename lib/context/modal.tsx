import { Fn } from "../types"
import { router } from "expo-router"
import { useContext, createContext, ReactNode, useState, useEffect } from "react"

interface OpenModalProps {
	content: ReactNode
	data?: any
	title: string
}

interface ModalContextType {
	isModalVisible: boolean
	content: ReactNode
	data: any
	openModal: ({ content }: OpenModalProps) => void
	title: string
	closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [data, setData] = useState<any>(null)
	const [content, setContent] = useState<ReactNode | null>(null)
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
	const [title, setTitle] = useState<string>("")

	const openModal: Fn<OpenModalProps> = ({ content, data, title }) => {
		setTitle(title)
		setContent(content)
		setIsModalVisible(true)
		setData(data)
		router.push("/modal")
	}

	const closeModal = () => {
		setTitle("")
		setIsModalVisible(false)
		setContent(null)
		setData(null)
		router.back()
	}

	return (
		<ModalContext.Provider
			value={{
				isModalVisible,
				openModal,
				closeModal,
				content,
				data,
				title,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}

export const useModal = () => {
	const context = useContext(ModalContext)
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider")
	}
	return context
}
