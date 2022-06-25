import { ReactNode } from 'react'

export interface LayoutProps {
    children?: ReactNode,
    topBar?: ReactNode,
    footer?: ReactNode
    isLoading?: boolean;
}