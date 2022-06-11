import { ReactNode } from 'react'

export interface TopBarProps {
    children?: ReactNode,
    navigation?: {
        override: boolean
        items: Array<ReactNode>
    },
    menu?: {
        override: boolean
        items: Array<ReactNode>
    },
}