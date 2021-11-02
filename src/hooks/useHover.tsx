import { useState } from "react"

export const useHover = () => {
    const [isHovered, setIsHovered] = useState(false)

    const handlers = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
    }

    return [isHovered, handlers]
}