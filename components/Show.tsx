import { FC, ReactNode } from "react"

export const Show: FC<{ when: boolean; children: ReactNode }> = ({ when, children }) => {
	return when ? <>{children}</> : null
}
