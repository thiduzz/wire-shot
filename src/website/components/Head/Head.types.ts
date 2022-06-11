import {ReactNode} from "react";

export interface HeadProp {
    children?: ReactNode[],
    title: string,
    description: string,
    updatedAt?: string
    image?: string
}