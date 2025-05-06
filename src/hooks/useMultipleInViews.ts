'use client'
import { useInView } from "react-intersection-observer"

export type ViewRef = (node?: Element | null | undefined) => void

export function useMultipleInViews(count: number){
    return Array.from({ length: count }, (_, i) => {
        return useInView({
            threshold: 1.0,
        });
    })
}